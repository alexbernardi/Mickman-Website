// Knob.jsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { KnobContext } from './KnobContext';
import '../css/Knob.css';

const mapRange = (x, xMin, xMax, yMin, yMax) => {
  return ((x - xMin) / (xMax - xMin)) * (yMax - yMin) + yMin;
};

const Knob = ({
  id,
  active = true,
  startValue = 0,
  size = '50px',
  sensitivity = '0.5',
  color = 'gray',
  knobType = "volume",
  min = 0,
  max = 100,
  label = '',
  rotationMaxDefault = 250,
  rotationMinDefault = -70,
}) => {
  const { updateKnobValue } = useContext(KnobContext);

  const [value, setValue] = useState(startValue);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const knobRef = useRef(null);
  const [rotationMax, setRotationMax] = useState(rotationMaxDefault);
  const [rotationMin, setRotationMin] = useState(rotationMinDefault);

  useEffect(() => {
    if (knobType === "volume") {
      setRotation(mapRange(startValue, min, max, rotationMin, rotationMax));
      setValue(startValue);
    } else if (knobType === "pan") {
      setRotation(mapRange(startValue, min, max, rotationMin, rotationMax));
      setValue(startValue);
    }
  }, [knobType, min]);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartY(event.clientY);
    document.body.classList.add('hide-cursor');
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.classList.remove('hide-cursor');
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const deltaY = Math.round(-sensitivity * (event.clientY - startY));
      let intermediateValue = value + deltaY;
      if (intermediateValue > max) {
        intermediateValue = max;
      } else if (intermediateValue < min) {
        intermediateValue = min;
      }
      setValue(intermediateValue);
      setRotation(Math.round(mapRange(intermediateValue, min, max, rotationMin, rotationMax)));
      updateKnobValue(id, intermediateValue); // Update the context
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  let progress;
  if (knobType === "pan") {
    progress = value < 0 ? Math.abs(value) * 3 : value * 3;
  } else {
    progress = Math.round(((value - min) / (max - min)) * 320); // 320 degrees span (-70 to 250)
  }

  const circumference = Math.round(2 * Math.PI * 30); // Radius is 30
  const strokeDasharray = `${Math.round((progress / 360) * circumference)} ${circumference}`;

  return (
    <div className='knobWrapper no-select'>
      <div className='knobContainer no-select' ref={knobRef} onMouseDown={handleMouseDown}>
        <svg width="70" height="70" className="progress-arc">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="35"
            cy="35"
            r="30"
            stroke="lightgray"
            strokeWidth="2"
            fill="none"
          />
          <g transform={knobType === "volume" || value > 0 ? "scale(1, 1) translate(0, 0)" : "scale(-1, 1) translate(-70, 0)"}>
            <circle
              cx="35"
              cy="35"
              r="30"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeDasharray={strokeDasharray}
              transform={knobType === "volume" ? "rotate(-70 35 35)" : "rotate(90 35 35)"}
              filter="url(#glow)"
            />
          </g>
        </svg>
        <div className="knobDotContainer" onMouseDown={handleMouseDown} style={{ transform: `rotate(${rotation}deg)` }}>
          <div className='knobDot'></div>
        </div>
        <div className='labelContainer'>
          <div className='label'> { label } </div>
        </div>
      </div>
    </div>
  );
};

export default Knob;