import React, { useState } from 'react';
import SubHeading from '../../components/SubHeading/SubHeading';
import './Header.css';
import { images } from '../../constants';

// Restaurant showcase images paths
const RESTAURANT_IMAGES = [
  images.resimage1,
  images.resimage2,
  images.resimage3,
  images.resimage4,
];

const Header = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);

  /**
   * Handles the explore button click to show gallery animation
   * Shows gallery, enlarges images, then hides after animation
   */
  const handleExploreClick = () => {
    setShowGallery(true);
    
    // Trigger enlargement animation immediately
    setTimeout(() => {
      setIsEnlarged(true);
    }, 0); 

    // Hide gallery after animation completes (1 second)
    setTimeout(() => {
      setIsEnlarged(false); 
      setShowGallery(false); 
    }, 1000); 
  };

  return (
    <div className="app__header app__wrapper section__padding" id="home">
      <div className="app__wrapper_info">
        <SubHeading title="Chase the new flavour" />
        <h1 className="app__header-h1">The key to Fine Dining</h1>
        <p className="p__opensans" style={{ margin: '2rem 0' }}>
          Let our culinary artisans guide you through a gastronomic journey that transcends the ordinary, unlocking the key to unparalleled sophistication in every bite.
        </p>
        
        <button type="button" className="custom__button" onClick={handleExploreClick}>
          Explore
        </button>
      </div>
      <div className="app__wrapper_img">
        <img src={images.welcomepng} alt="welcome" />
      </div>

      {showGallery && (
        <div className="menu__gallery">
          <div className="menu__gallery-content">
            <h2 className="gallery__heading">Our Hotel</h2>
            <div className="gallery__images">
              {RESTAURANT_IMAGES.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Restaurant showcase ${index + 1}`}
                  className={isEnlarged ? 'enlarged-image' : ''} 
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
