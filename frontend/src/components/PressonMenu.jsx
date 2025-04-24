import React from 'react';
import { assets } from '../assets/assets';

const PressOnMenu = () => {
  const services = [
    {
      name: 'Gel Press-Ons',
      description: 'Long-lasting press-ons with a glossy gel finish.',
      price: '$40+'
    },
    {
      name: 'French Press-Ons',
      description: 'Classic French tips with custom sizing and application.',
      price: '$45+'
    },
    {
      name: 'Luxury Press-On Set',
      description: 'Premium designs, Swarovski crystals, and extra durability.',
      price: '$65+'
    }
  ];

  return (
    <div className="flex flex-col justify-center items-center p-6 ">
      <div className="w-full flex-col  max-w-5xl bg-pink-50 rounded-3xl overflow-hidden shadow-md">
        <div className="p-6">
        <h2 className="text-4xl font-bold mb-4 flex items-center" style={{fontFamily:"BebasNeue-Regular"}}>Press-On Prices</h2>
          
          <div className="flex flex-col sm:flex-row mb-6 sm:gap-4">
            <div className="sm:w-1/3">
              
                <img 
                  src={assets.PokemonPressOn}
                  alt="Press-on nails sample" 
                  className="w-full h-64  rounded-xl object-cover"
                />
              
            </div>
            <div className="sm:w-2/3">
              {services.map((service, index) => (
                <div key={index} className="mb-4" style={{ fontFamily: 'PTSerif-Regular' }}>
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-lg font-bold">{service.name}:</h2>
                    <div className="flex-grow mx-2  "></div>
                    <span className="text-lg font-bold">{service.price}</span>
                  </div>
                  <p className="text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>




      
    </div>
  );
};

export default PressOnMenu;