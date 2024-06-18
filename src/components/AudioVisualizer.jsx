import React, { useEffect, useRef, useContext, useState } from 'react';
import { KnobContext } from './KnobContext';

const AudioVisualizer = ({ audioSrc, knobId }) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const { knobValues } = useContext(KnobContext);
  const [scaleFactor, setScaleFactor] = useState(1024.0);

  useEffect(() => {
    // Update the scaleFactor based on the knob value where id === "1"
    if (knobValues.volume !== undefined) {
      setScaleFactor(knobValues.volume * 10); // Adjust the multiplier as needed
    }
  }, [knobValues, knobId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();

    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 1024;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const drawFrequency = () => {
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.beginPath();
      console.log(scaleFactor);
      const sliceWidth = canvas.width / bufferLength;
      const yOffset = 50; // Adjust this value to move the waveform up
      let x = 0;

      for (let i = bufferLength - 1; i >= 0; i--) {
        const v = dataArray[i] / scaleFactor; // Use the scaleFactor here
        const y = canvas.height - (v * canvas.height) - yOffset;

        if (i === bufferLength - 1) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();

      // Draw frequency labels
      ctx.font = '10px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';

      for (let i = 0; i <= bufferLength; i += Math.floor(bufferLength / 10)) {
        const freq = (i * (audioCtx.sampleRate / 2)) / bufferLength;
        const label = freq.toFixed(0) + ' Hz';
        const labelX = (i * canvas.width) / bufferLength;
        ctx.fillText(label, labelX, canvas.height - 5);
      }
    };

    const draw = () => {
      requestAnimationFrame(draw);
      drawFrequency();
    };

    draw();

    audio.play();

    return () => {
      audio.pause();
      audioCtx.close();
    };
  }, [audioSrc, scaleFactor]); // Add scaleFactor to the dependency array

  return <canvas ref={canvasRef} width="800" height="218" />;
};

export default AudioVisualizer;