import { useState } from 'react';
import '../css/Carousel.css'

function ControlledCarousel({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  const showNextImage = () => {
    setImageIndex(index => {
      if (index === images.length - 1)  return 0
      return index + 1
    })
  }
  const showPreviousImage = () => {
    setImageIndex(index => {
      if (index === 0)  return images.length - 1
      return index - 1
    })
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative"}} className='carouselContainer'>
      {/* <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden"}} className='fuckThis justUseBootstrapNextTime'>
        {images.map((url) => (
          <img 
            key={url} 
            src={url} 
            className='img-slider-img'  
            style={{ 
              translate: `${-100 * imageIndex}%`}}
          />
        ))}
      </div>
      <button onClick={showPreviousImage} style={{ left: 0 }} className='img-slider-btn'>
          <ArrowBigLeft />
      </button>
      <button onClick={showNextImage} style={{ right: 0 }} className='img-slider-btn'>
          <ArrowBigRight />
      </button>
      <div className='img-slider-dot-btn'>
        {images.map((_, index) => (
          <button onClick={() => setImageIndex(index)}>{ index === imageIndex ? <CircleDot /> : <Circle /> }</button>
        ))}
      </div> */}
    </div>
  );
}

export default ControlledCarousel;