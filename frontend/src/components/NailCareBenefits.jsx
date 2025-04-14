import React from 'react';

const NailCareBenefits = () => {
  const benefits = [
    {
      title: "Improves nail health and promotes growth"
    },
    {
      title: "Reduces hangnails by hydrating the area"
    },
    {
      title: "Prevents gel and BIAB from lifting"
    },
    {
      title: "Replenishes the moisture lost during a manicure"
    },
    {
      title: "Improving nail elasticity and durability"
    },
    {
      title: "Protects against environmental damage by blocking bacteria and fungus"
    },
  ];

  return (
    <div className="bg-pink-100 p-6 rounded-2xl md:m-20 m-10" style={{ fontFamily: 'PTSerif-Regular' }}>


        <h2 className="text-6xl  text-center mb-6" style={{ fontFamily: 'Twister' }}>Why Cuticle Oil?</h2>
       
      {/* Mobile: 3 rows of 2 items */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-white rounded-full p-3 h-20 w-20 flex items-center justify-center">
              <img 
                src="/api/placeholder/60/60" 
                alt={`Icon for ${benefit.title}`} 
                className="w-12 h-12 text-rose-400"
              />
            </div>
            <p className="mt-2 text-xs font-medium">
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
                src="/api/placeholder/80/80" 
                alt={`Icon for ${benefit.title}`} 
                className="w-16 h-16 text-rose-400"
              />
            </div>
            <p className="mt-2 text-base font-medium">
              {benefit.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NailCareBenefits;