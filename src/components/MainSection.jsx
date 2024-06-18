import React, { useState, useRef, useEffect } from 'react';
import { KnobProvider } from './KnobContext';
import Knob from './Knob';
import Events from './Events';
import MyThreeComponent from './Lcd';
import AudioVisualizer from './AudioVisualizer';
import '../css/Main.css';



const MainSection = () => {

  const [audioSrc, setAudioSrc] = useState('YHTSS-04-gonnaMakeIt.wav');

  return (
  <main className="main no-select">
    <div className="outerEdgeWrapper outerEdgeWrapperLeft no-select">
      <div className='outerEdgeKnobsTop leftOuterEdgeKnobs no-select'>
        <Knob id="volume" active={true} startValue={75} size="50px" color="black" min={0} max={100} label="MASTER" knobType='volume' />
        <Knob id="2" active={true} size="50px" color="black" min={-50} max={50} label="ATTACK" knobType='pan' />
        <Knob id="3" active={true} size="50px" color="black" min={-50} max={50} label="RELEASE" knobType='pan' />
        <Knob id="4" active={true} size="50px" color="black" min={-50} max={50} label="DURATION" knobType='pan' />
      </div>
      <div></div>
      <img src="leftOuterEdge.png" alt="" draggable="false" />
    </div>
    <div className="innerEdgeWrapper innerEdgeWrapperLeft">
      <img src="leftInnerEdge.png" alt="" draggable="false" />
    </div>
    <div className="centralWrapper">
      {/* <img src="chalkThing.png" alt="" /> */}
      <div className='threeComponent'>
        <MyThreeComponent />
      </div>
      <div className='aWaveSpectrum'>
        <div className='leftChannelContainer audioChannels'>
          <AudioVisualizer audioSrc={audioSrc} />
        </div>
        <div className='rightChannelContainer audioChannels'>
          {/* <AudioVisualizer audioSrc={audioSrc} /> */}
        </div>
      </div>
      <div>
        <Events />
      </div> 
    </div>
    <div className="innerEdgeWrapper innerEdgeWrapperRight">
      <img src="rightInnerEdge.png" alt="" draggable="false" />
    </div>
    <div className="outerEdgeWrapper outerEdgeWrapperRight">
      <div className='outerEdgeKnobsTop rightOuterEdgeKnobs'>
        <Knob id="5" active={true} size="50px" color="black" min={0} max={100} label="DELAY" knobType='volume' />
        <Knob id="6" active={true} size="50px" color="black" min={-50} max={50} label="PHASER" knobType='pan' />
        <Knob id="7" active={true} size="50px" color="black" min={-50} max={50} label="FILTER" knobType='pan' />
        <Knob id="8" active={true} startValue={35} size="50px" color="black" min={-50} max={50} label="OSC" knobType='pan' />
      </div>
      <div>

      </div>
      <img src="rightOuterEdge.png" alt="" draggable="false" />
    </div>
  </main>
  );
};

export default MainSection;
