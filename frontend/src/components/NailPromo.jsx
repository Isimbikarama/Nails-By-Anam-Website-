import React from 'react';

const NailPromo = () => {
  return (
    <div className=" border border-gray-400 w-full min-h-screen flex justify-center items-center p-10 ">
      <div className="relative max-w-7xl w-full h-auto flex flex-col lg:block">
        
        {/* Right Side Image - Centered */}
        <div className="w-full lg:w-3/5 h-72 lg:h-[700px] bg-white rounded-3xl overflow-hidden lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 shadow-2xl mb-6 lg:mb-0">
          <img 
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" 
            alt="Pink press-on nails in various designs" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Left Side Content */}
        <div className="bg-pink-100 bg-opacity-70 p-8 rounded-3xl flex flex-col justify-center items-center text-center w-full lg:w-2/5 h-auto lg:h-[500px] shadow-lg lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-[-10%]">
          <h2 className="text-3xl text-black mb-6 leading-snug" style={{fontFamily:'PTSerif-Regular'}}>Nail's by Anam now offers personalized Press-on's via mail</h2>
          
          <div className="flex flex-col items-center">
            <p className="font-bold text-3xl tracking-wide mb-8" style={{fontFamily:'BebasNeue-Regular'}}>CUSTOM · AFFORDABLE · DURABLE</p>
            <button className="bg-pink-300 text-black px-8 py-4 text-lg rounded-lg font-semibold hover:bg-pink-400 transition-colors duration-300 shadow-md" style={{fontFamily:'PTSerif-Regular'}}>Explore the Collections</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NailPromo;


