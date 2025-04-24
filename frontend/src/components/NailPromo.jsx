import React from 'react';
import {useNavigate} from 'react-router-dom';
import { assets } from '../assets/assets';

const NailPromo = () => {

  const navigate = useNavigate();

  // Update the handleCheckAllServices function
const handleCheckCollection= () => {
  window.scrollTo(0, 0); // Scroll to top
  navigate('/Pressons');
};


  return (
    <div className="  w-full min-h-screen flex justify-center items-center p-10 px-[5%]">
      <div className="relative max-w-7xl w-full min-h-[600px] flex flex-col lg:block">
        
        {/* Right Side Image - Centered */}
        <div className="w-full h-[400px] lg:w-3/5 lg:h-[650px] bg-white rounded-3xl overflow-hidden lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 shadow-2xl">
          <img 
            src={assets.PokemonPressOn}
            alt="Pink press-on nails in various designs" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Left Side Content */}
        <div className="bg-pink-100 bg-opacity-70 p-8 rounded-3xl flex flex-col justify-center items-center text-center w-6/7 h-[300px] -mt-10 mx-auto lg:mt-0 lg:w-2/5 lg:h-[500px] shadow-lg lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-[-10%] relative z-10">
          <h2 className="text-xl lg:text-3xl text-black mb-4 lg:mb-6 leading-snug" style={{fontFamily:'PTSerif-Regular'}}>
            Nail's by Anam now offers personalized Press-on's via mail
          </h2>
          
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg lg:text-3xl tracking-wide mb-4 lg:mb-8" style={{fontFamily:'BebasNeue-Regular'}}>
              CUSTOM · AFFORDABLE · DURABLE
            </p>
            <button onClick={handleCheckCollection} className="bg-pink-300 text-black px-6 py-3 lg:px-8 lg:py-4 text-sm lg:text-lg rounded-lg  hover:bg-pink-400 transition-colors duration-300 shadow-md cursor-pointer" style={{fontFamily:'PTSerif-Regular'}}>
              Explore the Collections
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NailPromo;


