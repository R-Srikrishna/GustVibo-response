import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

// Logo image path from public folder
const LOGO_PATH = '/images/logo.png';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUserData(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, [isLoggedIn]);

  /**
   * Handles profile icon click to toggle modal
   */
  const handleProfileClick = () => {
    setShowProfileModal(!showProfileModal);
  };

  /**
   * Closes profile modal when clicking outside
   */
  const handleModalClose = (e) => {
    if (e.target.classList.contains('profile-modal-overlay')) {
      setShowProfileModal(false);
    }
  };

  /**
   * Handles user logout by clearing localStorage and redirecting to home
   */
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowProfileModal(false);
    navigate('/');
  };

  /**
   * Scrolls to top of page when navigation link is clicked
   */
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link to="/" onClick={handleLinkClick}>
          <img src={LOGO_PATH} alt="GustVibo Restaurant Logo" />
        </Link>
      </div>

      <ul className="app__navbar-links">
        <li className="p__opensans"><Link to="/" onClick={handleLinkClick}>Home</Link></li>
        <li className="p__opensans"><Link to="/about" onClick={handleLinkClick}>About</Link></li>
        <li className="p__opensans"><Link to="/menu" onClick={handleLinkClick}>Menu</Link></li>
        <li className="p__opensans"><Link to="/awards" onClick={handleLinkClick}>Awards</Link></li>
        <li className="p__opensans"><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
        {isLoggedIn && (
          <li className="p__opensans"><Link to="/BookTable" onClick={handleLinkClick}>BookTable</Link></li>
        )}
      </ul>

      <div className="app__navbar-login">
        {isLoggedIn ? (
          <>
            <FaRegUserCircle 
              className="user-icon profile-icon" 
              fontSize={32} 
              onClick={handleProfileClick}
              style={{ color: 'white', marginRight: '10px', cursor: 'pointer' }} 
            />
          </>
        ) : (
          <>
            <Link to="/login" className="p__opensans login-link" onClick={handleLinkClick}>Login</Link>
            <Link to="/signup" className="p__opensans signup-link" onClick={handleLinkClick}>Signup</Link>
          </>
        )}
      </div>

      {/* Profile Modal */}
      {showProfileModal && isLoggedIn && (
        <div 
          className="profile-modal-overlay" 
          onClick={handleModalClose}
        >
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <FaRegUserCircle className="profile-modal-icon" fontSize={60} />
              <h2>User Profile</h2>
              <button 
                className="profile-modal-close" 
                onClick={() => setShowProfileModal(false)}
              >
                ×
              </button>
            </div>
            <div className="profile-modal-content">
              <div className="profile-info-item">
                <label>Name:</label>
                <p>{userData?.name || 'N/A'}</p>
              </div>
              <div className="profile-info-item">
                <label>Email:</label>
                <p>{userData?.email || 'N/A'}</p>
              </div>
              {userData?.number && (
                <div className="profile-info-item">
                  <label>Phone:</label>
                  <p>{userData.number}</p>
                </div>
              )}
            </div>
            <div className="profile-modal-footer">
              <button onClick={handleLogout} className="profile-logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links">
              <li onClick={() => { setToggleMenu(false); handleLinkClick(); }}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={() => { setToggleMenu(false); handleLinkClick(); }}>
                <Link to="/about">About</Link>
              </li>
              <li onClick={() => { setToggleMenu(false); handleLinkClick(); }}>
                <Link to="/menu">Menu</Link>
              </li>
              <li onClick={() => { setToggleMenu(false); handleLinkClick(); }}>
                <Link to="/awards">Awards</Link>
              </li>
              <li onClick={() => { setToggleMenu(false); handleLinkClick(); }}>
                <Link to="/contact">Contact</Link>
              </li>
              {isLoggedIn && (
                <li onClick={() => { setToggleMenu(false); handleLinkClick(); }}>
                  <Link to="/BookTable">BookTable</Link>
                </li>
              )}
              {isLoggedIn ? (
                <li onClick={() => { setToggleMenu(false); handleLogout(); }}>
                  Logout
                </li>
              ) : (
                <>
                  <li onClick={() => { setToggleMenu(false); handleLinkClick(); }}>
                    <Link to="/login">Login</Link>
                  </li>
                  <li onClick={() => { setToggleMenu(false); handleLinkClick(); }}>
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
