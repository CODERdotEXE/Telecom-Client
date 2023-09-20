// client/src/components/Carousel.js

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../assets/image1.png'; // Import your carousel images
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.png';

function ImageCarousel() {
  return (
    <Carousel
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      interval={3000} // Change image after 3 seconds
      showArrows={true}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="carousel-button prev"
          >
            &#8249; {/* Unicode Left arrow */}
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="carousel-button next"
          >
            &#8250; {/* Unicode Right arrow */}
          </button>
        )
      }
      className="image-carousel" // Add custom class for styling
    >
      <div>
        <img src={image1} alt="Image 1" />
      </div>
      <div>
        <img src={image2} alt="Image 2" />
      </div>
      <div>
        <img src={image3} alt="Image 3" />
      </div>
      <div>
        <img src={image4} alt="Image 4" />
      </div>
      <div>
        <img src={image5} alt="Image 5" />
      </div>
    </Carousel>
  );
}

export default ImageCarousel;
