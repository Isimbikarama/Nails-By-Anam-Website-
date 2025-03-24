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
      <Header/>
      <Services/>
      <NailPromo/>
      <About />
    <ReviewCarousel />
      <Footer/>
      {/* Add more content here */}
    </div>
  );
};

export default Homepage;