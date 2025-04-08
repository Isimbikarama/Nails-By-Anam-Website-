import React from 'react';
import { useNavigate } from 'react-router-dom';

const HowToOrder = () => {
  const navigate = useNavigate();

  const handleGoToBooking = () => {
    window.scrollTo(0, 0);
    navigate('/Booking');
  }
  const steps = [
    {
      id: 1,
      title: "Find a pic of the set you want!",
      icon: "📱"
    },
    {
      id: 2,
      title: "Mesure your nails using the mesuring guide.",
      icon: "💅"
    },
    {
      id: 3,
      title: "Book Online or send a DM!",
      icon: "💻"
    }
  ];

  return (
    <div className="lg:px-40 px-20 py-6 min-h-screen md:mt-[-7%]">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center mb-10">
          <span className="text-4xl mr-3">📦</span>
          <h1 className="text-4xl font-bold text-black" style={{fontFamily:"PTSerif-Regular"}}>How to Order</h1>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-12" style={{fontFamily:"PTSerif-Regular"}}>
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="bg-pink-50 rounded-3xl p-6 flex-1 shadow-md flex flex-col items-center"
            >
              <div className="h-40 flex items-center justify-center mb-6">
                <span className="text-6xl">{step.icon}</span>
              </div>
              <p className="text-center text-lg font-medium">
                <span className="font-bold">{step.id}. </span>
                {step.title}
              </p>
            </div>
          ))}
        </div>

        {/* Book Now Button */}
        <div className="flex justify-center">
          <button onClick={handleGoToBooking} className="bg-pink-100 hover:bg-pink-200 text-stone-800 font-bold text-2xl py-4 px-10 rounded-full shadow-md transition-colors" style = {{fontFamily: 'PTSerif-Regular'}}>    
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowToOrder;