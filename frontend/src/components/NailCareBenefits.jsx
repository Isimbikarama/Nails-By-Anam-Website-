import React from 'react';
import { assets } from '../assets/assets';

const NailCareBenefits = () => {
  const benefits = [
    {
      title: "Improves nail health and promotes growth",
      image: assets.manicure
    },
    {
      title: "Reduces hangnails by hydrating the area",
      image: assets.scissors
    },
    {
      title: "Prevents gel and BIAB from lifting",
      image: assets.nailpolish
    },
    {
      title: "Replenishes the moisture lost during a manicure",
      image: assets.CuticleOil
    },
    {
      title: "Improving nail elasticity and durability",
      image: assets.manicure
    },
    {
      title: "Protects against environmental damage",
      image: assets.shield
    },
  ];

  return (
    <div className="bg-pink-100 p-6 rounded-2xl md:m-20 m-10" style={{ fontFamily: 'PTSerif-Regular' }}>
      <h2 className="text-6xl text-center mb-6" style={{ fontFamily: 'Twister' }}>Why Cuticle Oil?</h2>
       
      {/* Mobile: 3 rows of 2 items */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-white rounded-full p-3 h-20 w-20 flex items-center justify-center">
              <img 
                src={benefit.image} 
                alt={benefit.title}
                className="w-12 h-12 object-contain "
              />
            </div>
            <p className="mt-2 text-xs font-medium text-pink-500">
              {benefit.title}
            </p>
          </div>
        ))}
      </div>
      
      {/* Desktop: 2 rows of 3 items */}
      <div className="hidden md:grid grid-cols-3 gap-x-6 gap-y-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-white rounded-full p-4 h-24 w-24 flex items-center justify-center">
              <img 
                src={benefit.image}
                alt={benefit.title}
                className="w-16 h-16 object-contain color-pink-500"
              />
            </div>
            <p className="mt-2 text-base font-medium text-pink-700">
              {benefit.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NailCareBenefits;