// MyThreeComponent.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { SobelOperatorShader } from 'three/addons/shaders/SobelOperatorShader.js';
import { gsap } from 'gsap';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'

const MyThreeComponent = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Canvas this is a disaster
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    mountRef.current.appendChild(canvas);
    const container = mountRef.current;
    // console.log(canvas.style.width);
    let { width, height } = container.getBoundingClientRect();
    width = width - .5;
    height = height + 1.5;
    // Scene
    const scene = new THREE.Scene();

    // Sizes
    const sizes = {
      width: width,
      height: height,
    };

    // Responsive variable
    let responsiveVar;
    if (sizes.width <= 360) {
      responsiveVar = 'phone';
    } else if (sizes.width > 360 && sizes.width <= 800) {
      responsiveVar = 'tablet';
    } else if (sizes.width > 800 && sizes.width <= 1400) {
      responsiveVar = 'laptop';
    } else if (sizes.width > 1400) {
      responsiveVar = 'desktop';
    }

    // Fonts
    const fontLoader = new FontLoader();
    const radius = 50;
    const points = [];
    const divisions = 13;

    // Generate points around a torus
    for (let i = 0; i <= divisions; i++) {
      const angle = (i / divisions) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const y = 0;
      const z = radius * Math.sin(angle);
      points.push(new THREE.Vector3(x, y, z));
    }

    // Create the spline
    const spline = new THREE.CatmullRomCurve3(points);

    const textGroup = new THREE.Group();
    const text = 'computer music computer music computer';
    const textMeshes = [];
    const splinePoints = spline.getPoints(text.length);

    fontLoader.load('threeJSassets/Notable_Regular.json', (font) => {
      const textMaterial = new THREE.MeshBasicMaterial({
        wireframe: false,
        color: 0x00ff00,
      });

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charGeometry = new TextGeometry(char, {
          font: font,
          size: 5,
          depth: 1,
          curveSegments: 4,
          bevelEnabled: false,
        });
        const charMesh = new THREE.Mesh(charGeometry, textMaterial);
        textMeshes.push(charMesh);
      }

      // Create a group to hold the text meshes
      textMeshes.forEach((textMesh, index) => {
        const point = splinePoints[index];
        textMesh.position.copy(point);

        textGroup.add(textMesh);
      });

    //   scene.add(textGroup);

      textGroup.position.y = 5;
    });

    // Function to align text meshes with the camera
    function alignTextWithCamera() {
      textGroup.children.forEach((textMesh) => {
        textMesh.quaternion.copy(camera.quaternion);
      });
    }

    // Custom Shader Material
    const material = new THREE.MeshStandardMaterial({
      color: 0xbf55ec,
      roughness: 0,
      wireframe: false,
    });

    // Camera
    const camera = new THREE.PerspectiveCamera(180, sizes.width / sizes.height, 0.1, 2300);
    camera.position.set(0, 100, 0);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // Instantiate a loader
    const loader = new OBJLoader();
    let brain;
    let brainLoaded = false;

    // Load a resource
    loader.load(
      'threeJSassets/meshes/testbrain2/testBrain.obj',
      (object) => {
        brain = object.children[0];
        object.children[0].material = material;
        object.children[0].material.wireframe = false;
        scene.add(object);
        brainLoaded = true;
        brain.position.y = -1;

        setTimeout(() => {
          removePass(glitchPass);
        }, 1000);
        gsap.to(camera.position, {
          duration: 10,
          ease: 'expoScale(0.5,7,none)',
          y: 30,
        });
        gsap.to(camera, {
          duration: 100,
          ease: 'expoScale(0.5,7,none)',
          setFocalLength: 160,
        });
      },
      (xhr) => {
        // Loading in progress
      },
      (error) => {
        console.log('An error happened');
      }
    );

    // Water
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('threeJSassets/textures/waternormals.jpg', (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 10,
      fog: scene.fog !== undefined,
    });

    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Post processing
    const effectComposer = new EffectComposer(renderer);
    effectComposer.setSize(sizes.width, sizes.height);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const renderPassNormal = new RenderPass(scene, camera);
    effectComposer.addPass(renderPassNormal);

    let effectSobel = new ShaderPass(SobelOperatorShader);
    effectSobel.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio;
    effectSobel.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio;
    effectComposer.addPass(effectSobel);

    // const dotScreenPass = new DotScreenPass()
    // effectComposer.addPass(dotScreenPass)

    let glitchPass = new GlitchPass();
    glitchPass.goWild = false;
    effectComposer.addPass(glitchPass);

    // Skybox
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;

    skyUniforms['turbidity'].value = 1;
    skyUniforms['rayleigh'].value = 5;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    const parameters = {
      elevation: 3,
      azimuth: 165,
    };

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const sceneEnv = new THREE.Scene();

    let renderTarget;
    let sun = new THREE.Vector3();

    function updateSun() {
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
      const theta = THREE.MathUtils.degToRad(parameters.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);

      sky.material.uniforms['sunPosition'].value.copy(sun);
      water.material.uniforms['sunDirection'].value.copy(sun).normalize();

      if (renderTarget !== undefined) renderTarget.dispose();

      sceneEnv.add(sky);
      renderTarget = pmremGenerator.fromScene(sceneEnv);
      scene.add(sky);

      scene.environment = renderTarget.texture;
    }

    updateSun();

    // Animate
    const clock = new THREE.Clock();

    // Function to remove a pass from the composer
    function removePass(pass) {
        const passIndex = effectComposer.passes.indexOf(pass);
        if (passIndex > -1) {
        effectComposer.passes.splice(passIndex, 1);
        }
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Brain animate
      if (brain) {
        brain.rotation.set(0, elapsedTime * 0.1 + 4.3, 0);
      }

      controls.update();
      alignTextWithCamera();

      water.material.uniforms['time'].value += 0.1 / 60.0;

      renderer.render(scene, camera);
      effectComposer.render();

      window.requestAnimationFrame(tick);
    };

    tick();

    // Cleanup function
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default MyThreeComponent;