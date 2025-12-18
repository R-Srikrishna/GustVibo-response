/**
 * Image Assets Configuration
 * 
 * All images are stored in the public/images folder and accessed via public paths.
 * This approach allows images to be referenced directly without webpack bundling.
 */

// Base path for all images in the public folder
const IMAGES_PATH = '/images';

// Image asset paths - organized by category for better maintainability
const imageAssets = {
  // Background images
  bgGestvibo: `${IMAGES_PATH}/bgGestvibo.jpeg`,
  
  // Chef and restaurant images
  chefimage: `${IMAGES_PATH}/chefimage.webp`,
  restaurantlogo: `${IMAGES_PATH}/restaurantlogo.png`,
  welcomepng: `${IMAGES_PATH}/welcomepng.png`,
  
  // Gallery images
  gallery1: `${IMAGES_PATH}/gallery1.jpeg`,
  gallery2: `${IMAGES_PATH}/gallery2.jpg`,
  gallery3: `${IMAGES_PATH}/gallery3.jpeg`,
  gallery5: `${IMAGES_PATH}/gallery5.png`,
  
  // Logo images
  gustvibologo: `${IMAGES_PATH}/gustvibologo (2).png`,
  gustviblogo2: `${IMAGES_PATH}/gustviblogo2.png`,
  logoGust: `${IMAGES_PATH}/logoGust.png`,
  
  // Media files
  meals: `${IMAGES_PATH}/meals.mp4`,
  
  // UI elements
  spoon: `${IMAGES_PATH}/spoon.png`,
  menu: `${IMAGES_PATH}/menu.png`,
  sign: `${IMAGES_PATH}/sign.png`,
  quotes: `${IMAGES_PATH}/quotes.png`,
  
  // Award images
  award1: `${IMAGES_PATH}/award1.png`,
  award2: `${IMAGES_PATH}/award2.png`,
  award3: `${IMAGES_PATH}/award3 (2).png`,
  award4: `${IMAGES_PATH}/award4.png`,
  
  // Location/Find Us
  FindUs: `${IMAGES_PATH}/FindUs (2).png`,
  
  // Menu item images
  image1: `${IMAGES_PATH}/image1.png`,
  image2: `${IMAGES_PATH}/image2.jpg`,
  image3: `${IMAGES_PATH}/image3.jpg`,
  image4: `${IMAGES_PATH}/image4.jpg`,
  image5: `${IMAGES_PATH}/image5.jpg`,
  image6: `${IMAGES_PATH}/image6.png`,
  image7: `${IMAGES_PATH}/image7.png`,
  image8: `${IMAGES_PATH}/image8.png`,
  image9: `${IMAGES_PATH}/image9.png`,
  image10: `${IMAGES_PATH}/image10.png`,
  image11: `${IMAGES_PATH}/image11.png`,
  image12: `${IMAGES_PATH}/image12.png`,
  image13: `${IMAGES_PATH}/image13.png`,
  image14: `${IMAGES_PATH}/image14.png`,
  
  // Restaurant showcase images
  resimage1: `${IMAGES_PATH}/resimage1.jpeg`,
  resimage2: `${IMAGES_PATH}/resimage2.jpeg`,
  resimage3: `${IMAGES_PATH}/resimage3.jpeg`,
  resimage4: `${IMAGES_PATH}/resimage4.jpeg`,
};

export default imageAssets;
