import React, { useState } from 'react';
import '../css/Button.css';

const Button = ({ size, name, toggle }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleButton = () => {
    setIsOn(!isOn);
  };

  return (
    <button style={buttonStyle} onClick={toggleButton}>
      {name} - {isOn ? 'On' : 'Off'}
    </button>
  );
};

export default Button;
