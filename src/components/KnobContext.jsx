// KnobContext.js
import React, { createContext, useState } from 'react';

export const KnobContext = createContext();

export const KnobProvider = ({ children }) => {
  const [knobValues, setKnobValues] = useState({});

  const updateKnobValue = (id, value) => {
    setKnobValues(prevValues => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <KnobContext.Provider value={{ knobValues, updateKnobValue }}>
      {children}
    </KnobContext.Provider>
  );
};