import '../css/Navbar.css';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const NavbarComponent = () => (
    <header className='navHeader no-select'>
        <div className="logoWrapper navComponents no-select">
            <div className='logoContainer no-select'>
                <img className="mickmanTextImg no-select" src="logoWhite.png" alt="" draggable="false" />
            </div>
        </div>
        <div className="speakerWrapper navComponents">
            <img className="speakerTopImg" src="topSpeakerMaterial.png" alt="" draggable="false" />
        </div>
        <div className="socialWrapper navComponents">
            <div className="socialContainer">
                <div className="socialContainerContainer">
                    <div className="social">
                        <a className="social" href="https://www.facebook.com/mickmanmusic" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                    </div>
                    <div className="social">
                        <a className="social" href="https://www.instagram.com/mickmanmusic/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    </div>
                    <div className="social">
                        <a className="social" href="https://x.com/mickman" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                    </div>
                    <div className="blinkingLightContainer">
                        <div className="blinkingLight"></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default NavbarComponent;