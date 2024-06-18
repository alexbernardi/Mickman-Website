import '../css/Events.css';
import ControlledCarousel from './ControlledCarousel';

const images = [
    'theRendezvous.png',
    'soundHaven.png',
    'solshine.png',
    'evolutions.png',
    'missionBallroom.png',
  ];

const EventsComponent = () => (
    <div className='eventsContainer'>
        {/* <div className='eventsNav'>
            <div className='topEventContent'>UPCOMING EVENTS</div>
        </div>
        <div className='eventsBody'>
            <div className='eventComponent'>
                <ControlledCarousel images={images} />
            </div>
            <div className="backgroundGradient"></div>
            <img className='eventImg' src="eventBackground.png" alt="" />
        </div> */}
        
    </div>
);

export default EventsComponent;