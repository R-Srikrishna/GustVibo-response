import React from 'react';
import { Link } from 'react-router-dom';
import SubHeading from '../../components/SubHeading/SubHeading';
import MenuItem from '../../components/Menuitem/MenuItem';
import { data, images } from '../../constants/';
import './SpecialMenu.css';
// import './MenuPage'

const SpecialMenu = () => (
  <div className="app__specialMenu flex__center section__padding" id="menu">
    <div className="app__specialMenu-title">
      <SubHeading title="Menu that fits your palate" />
      <h1 className="headtext__cormorant">Today's Special</h1>
    </div>


    <div className="app__specialMenu-menu">
      <div className="app__specialMenu-menu_wine flex__center">
        <p className="app__specialMenu-menu_heading">Wine & Beer</p>
        <p className="app__specialMenu-menu_description">
          Our Wine & Beer collection features a variety of carefully selected options to complement your meal. From bold reds and crisp whites to refreshing lagers and rich stouts, we offer the perfect pairing for every taste. Whether you're looking to unwind with a glass of wine or enjoy the smooth flavor of an ice-cold beer, our selection is designed to satisfy. Experience the perfect harmony of taste with our premium wines and beers, thoughtfully curated to deliver a memorable dining experience. Let each sip transport you to a world of flavor.
        </p> 
        <div className="app__specialMenu_menu_items">
          {data.wines.map((wine, index) => (
            <MenuItem
              key={wine.title + index}
              title={wine.title}
              price={wine.price}
              tags={wine.tags}
            />
          ))}
        </div>
      </div>


      <div className="app__specialMenu-menu_img">
        <img src={images.menu} alt="menu__img" />
      </div>

 
      <div className="app__specialMenu-menu_cocktails flex__center">
        <p className="app__specialMenu-menu_heading">Cocktails</p>
        <p className="app__specialMenu-menu_description">
          Our cocktail menu is designed to take you on a journey of refreshing and exciting flavors. From timeless classics like the Margarita and Martini to innovative blends crafted by our expert bartenders, every cocktail is a work of art. Whether you prefer something light and fruity or a more robust and complex flavor, our cocktails will delight your senses. Perfect for any occasion, these drinks are expertly mixed to deliver the ideal balance of taste, strength, and aroma. Sip, relax, and let the experience begin!
        </p> 
        <div className="app__specialMenu_menu_items">
          {data.cocktails.map((cocktail, index) => (
            <MenuItem
              key={cocktail.title + index}
              title={cocktail.title}
              price={cocktail.price}
              tags={cocktail.tags}
            />
          ))}
        </div>
      </div>
    </div>

    <div style={{ marginTop: 15 }}>
      <Link to="/menu">
        <button type="button" className="custom__button">
          View More
        </button>
      </Link>
    </div>
  </div>
);

export default SpecialMenu;
