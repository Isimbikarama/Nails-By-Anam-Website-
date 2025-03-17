import React from 'react';
import Header from '../components/Header';
import Services from '../components/Services';
import NailPromo from '../components/NailPromo';

const Homepage = () => {
  return (
    <div>
      <Header/>
      <Services/>
      <NailPromo/>
      {/* Add more content here */}
    </div>
  );
};

export default Homepage;