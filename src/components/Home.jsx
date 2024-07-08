import React from 'react';
import Navbar from './Navbar';
import MainSection from './MainSection';
import Footer from './Footer';
import { KnobProvider } from './KnobContext';
import { KeyPressProvider } from './KeyPressContext'; // Adjust the path as necessary

const Home = () => (
    <div className='homeWrapper'>
        <KeyPressProvider>
            <Navbar />
            <KnobProvider>
                <MainSection />
            </KnobProvider>
            <Footer />
        </KeyPressProvider>
    </div>
);

export default Home;
