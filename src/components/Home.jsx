import React from 'react';
import Navbar from './Navbar';
import MainSection from './MainSection';
import Footer from './Footer';
import { KnobProvider } from './KnobContext';

const Home = () => (
    <div className='homeWrapper'>
        <Navbar />
        <KnobProvider>
            <MainSection />
        </KnobProvider>
        <Footer />
    </div>
);

export default Home;
