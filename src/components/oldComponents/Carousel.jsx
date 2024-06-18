import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import slides from '../assets/slides';
import '../css/MyCarousel.css';

const MyCarousel = () => (
  <div style={{ width: '80%', margin: '0 auto' }}>
    <Carousel showThumbs={false} swipeable={true} showIndicators={false} showStatus={false}>
      {slides.map((slide, index) => (
        <div key={index}>
          <img src={slide.image} alt={slide.alt} style={{ width: '800px', height: 'auto' }} />
          <p className="legend">{slide.legend}</p>
        </div>
      ))}
    </Carousel>
  </div>
);

export default MyCarousel;