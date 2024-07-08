import React, { createContext, useContext, useState } from 'react';

const KeyPressContext = createContext();

export const useKeyPress = () => useContext(KeyPressContext);

export const KeyPressProvider = ({ children }) => {
    const [pressedKey, setPressedKey] = useState(null);

    return (
        <KeyPressContext.Provider value={{ pressedKey, setPressedKey }}>
            {children}
        </KeyPressContext.Provider>
    );
};
