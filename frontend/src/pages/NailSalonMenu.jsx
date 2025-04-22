import React from 'react';
import Footer from '../components/Footer';
import Menu from '../components/Menu';  
import Promotions from '../components/Promotions';

const NailSalonMenu = () => {
  return (
    <div className='fade-in'>
       <h1 className="text-7xl glow text-white my-6 text-center p-6" style={{fontFamily:'bebasNeue-Regular'}}>Services</h1>
       <Promotions/>
        <Menu/>
       
      <Footer/>
      
    </div>
  );
};

export default NailSalonMenu;