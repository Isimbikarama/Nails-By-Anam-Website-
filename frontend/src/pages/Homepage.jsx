import React from 'react';

import Header from '../components/Header';
import Services from '../components/Services';
import NailPromo from '../components/NailPromo';
import Footer from '../components/Footer';
import About from '../components/About';
import ReviewCarousel from '../components/ReviewCarousel';  


const Homepage = () => {
  return (
    <div>
      <div className="fade-in">
        <Header/>
      </div>
      <div className="fade-in delay-1">
        <Services/>
      </div>
      <div className="fade-in delay-2">
        <NailPromo/>
      </div>
      <div className="fade-in delay-3">
        <About />
      </div>
      <div className="fade-in delay-4">
        <ReviewCarousel />
      </div>
      <div className="fade-in delay-5">
        <Footer/>
      </div>
    </div>
  );
};

export default Homepage;