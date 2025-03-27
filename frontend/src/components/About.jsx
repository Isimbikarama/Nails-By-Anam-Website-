import React from "react";
import { useNavigate } from "react-router-dom"; 

const About = () => {

  const navigate = useNavigate(); 
  
  const handleLearnMore = () => {
    window.scrollTo(0, 0); // Scroll to top
    navigate('/about');
  }
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mb-20 md:p-20 md:gap-8 md:mt-[-5%] md:mb-[-5%]">  
      {/* Profile Image */}
      <div className="flex-shrink-0 p-2">
        <img
          src="https://media.licdn.com/dms/image/v2/C5603AQFKCawRx3Ddhg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1615352553671?e=2147483647&v=beta&t=nP-jbWrPxy-Zx4Yqt6fUP2SZ4iG9VWeZato5F1VW_n4"
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
        <button onClick={handleLearnMore} className="bg-pink-400 hover:bg-pink-500 text-black font-medium text-xl md:text-2xl px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-md transition-all duration-300" style={{fontFamily: 'PTSerif-Regular'}}>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default About;