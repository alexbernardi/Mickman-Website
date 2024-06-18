import '../css/Navbar.css';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

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
                    <div className="social"><FaFacebookF /></div>
                    <div className="social"><FaInstagram /></div>
                    <div className="social"><FaTwitter /></div>
                    <div className="blinkingLightContainer">
                        <div className="blinkingLight"></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default NavbarComponent;