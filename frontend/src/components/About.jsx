import React from "react";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-2 gap-8 mt-[-5%] mb-[-5%]">  
      {/* Profile Image */}
      <div className="flex-shrink-0 p-2">
        <img
          src="/path-to-your-image.jpg"
          alt="Anam"
          className="w-64 h-64 md:w-128 md:h-128 object-cover rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* Text Content */}
      <div className="text-center md:text-left max-w-md">
        <h1 className="text-white text-6xl md:text-7xl glow mb-6" style={{fontFamily: 'BebasNeue-Regular'}}>
          ABOUT ME
        </h1>
        <p className="text-black text-lg md:text-xl mb-8" style={{fontFamily: 'PTSerif-Regular'}}>
          Meet Anam! A passionate nail artist dedicated to delivering
          high-quality, customized nail designs.
        </p>

        {/* Button */}
        <button className="bg-pink-400 hover:bg-pink-500 text-black font-medium text-xl md:text-2xl px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-md transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default About;