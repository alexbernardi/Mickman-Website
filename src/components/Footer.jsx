import '../css/Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const FooterComponent = () => (
    <footer className='footer no-select'>
        <div className='contactContainer'>
            <p className='contactContent cLeft'>Mickman <br></br> all rights reserved.</p>
            <p className='contactContent cRight'> Contact: <br></br> <a href="mailto:placeholder@placeholder.com">placeholder@placeholder.com</a> <br></br> for bookings.</p>
        </div>
    </footer>
);

export default FooterComponent;