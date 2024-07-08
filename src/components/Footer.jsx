import React from 'react';
import '../css/Footer.css';
import { useKeyPress } from './KeyPressContext'; // Adjust the import path as necessary

const keys = [
    { name: 'c', type: 'black' },
    { name: 'cSh', type: 'white' },
    { name: 'd', type: 'black' },
    { name: 'dSh', type: 'white' },
    { name: 'e', type: 'black' },
    { name: 'f', type: 'black' },
    { name: 'fSh', type: 'white' },
    { name: 'g', type: 'black' },
    { name: 'gSh', type: 'white' },
    { name: 'a', type: 'black' },
    { name: 'aSh', type: 'white' },
    { name: 'b', type: 'black' },
    { name: 'c2', type: 'black' },
    { name: 'cSh2', type: 'white' },
    { name: 'd2', type: 'black' },
    { name: 'dSh2', type: 'white' },
    { name: 'e2', type: 'black' },
    { name: 'f2', type: 'black' },
    { name: 'fSh2', type: 'white' },
    { name: 'g2', type: 'black' },
    { name: 'gSh2', type: 'white' },
    { name: 'a2', type: 'black' },
    { name: 'aSh2', type: 'white' },
    { name: 'b2', type: 'black' },
  ];
  
  const FooterComponent = () => {
    const { pressedKey, setPressedKey } = useKeyPress();
  
    return (
      <footer className='footer no-select'>
        <div className='synth-container'>
          <div className='synth-octave-container'>
            {keys.map((key) => (
              <div
                key={key.name}
                className={`${key.type}-keys ${pressedKey === key.name ? 'pressed' : ''}`}
                tabIndex='0'
                onMouseDown={() => setPressedKey(key.name)}
                onMouseUp={() => setPressedKey(null)}
                onMouseLeave={() => setPressedKey(null)}
              ></div>
            ))}
          </div>
        </div>
      </footer>
    );
  };
  
  export default FooterComponent;