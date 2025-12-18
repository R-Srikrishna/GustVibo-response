import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Header from './container/Header/Header';
import Intro from './container/Intro/Intro';
import Laurels from './container/Laurels/Laurels';
import Gallery from './container/Gallery/Gallery';
import FindUs from './container/Findus/FindUs';
import Footer from './container/Footer/Footer';
import AboutUs from './container/AboutUs/AboutUs';
import SpecialMenu from './container/Menu/SpecialMenu';
import MenuPage from './container/Menu/MenuPage';
import Chef from './container/Chef/Chef';
import ThankYou from './components/Navbar/thankyou';
import Login from './components/Navbar/Login';
import SubscriptionThankYou from './components/Footer/subscription';
import Signup from './components/Navbar/signup';
import BookTable from './components/Navbar/BookTable';
import UserDetails from './components/Navbar/userDetails'; 
import './App.css';
import './index.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Set background image CSS variable for public folder assets
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .app__bg {
        background-image: url('/images/bgGestvibo.jpeg');
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <AboutUs />
                <SpecialMenu />
                <Chef />
                <Intro />
                <Laurels />
                <Gallery />
                <FindUs />
              </>
            }
          />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/awards" element={<Laurels />} />
          <Route path="/contact" element={<FindUs />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/subscription-thank-you" element={<SubscriptionThankYou />} />
          <Route path="/BookTable" element={<BookTable />} />
          <Route path="/userdetails/:tableId" element={<UserDetails />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
};

export default App;
