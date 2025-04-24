import React from 'react';
import { useNavigate } from 'react-router-dom';

const HowToOrder = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleGoToBooking = () => {
    window.scrollTo(0, 0);
    navigate('/Booking');
  };

  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollLeft;
    const cardWidth = e.target.offsetWidth;
    const newActiveStep = Math.round(scrollPosition / cardWidth);
    setActiveStep(newActiveStep);
  };

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
    <div className="px-6 md:px-20 lg:px-40 py-10 md:py-15">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 md:mb-10 px-4">
          <span className="text-3xl md:text-4xl mr-3">📦</span>
          <h1 className="text-3xl md:text-4xl font-bold text-black" style={{ fontFamily: "PTSerif-Regular" }}>
            How to Order
          </h1>
        </div>

        {/* Scrollable container */}
        <div className="relative">
          {/* Steps with horizontal scroll */}
          <div
            className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-hidden scrollbar-hide snap-x snap-mandatory md:snap-none gap-4 pb-6 -mx-6 md:mx-0"
            style={{ fontFamily: "PTSerif-Regular" }}
            onScroll={handleScroll}
          >
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex-none w-screen pl-6 pr-6 md:w-auto md:px-4 snap-center md:snap-none"
              >
                <div className="bg-pink-50 rounded-3xl p-6 h-full shadow-md flex flex-col items-center">
                  <div className="h-32 md:h-40 flex items-center justify-center mb-6">
                    <span className="text-5xl md:text-6xl scale-150">{step.icon}</span>
                  </div>
                  <p className="text-center text-base md:text-lg font-medium">
                    <span className="font-bold">{step.id}. </span>
                    {step.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Toggle indicators - mobile only */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeStep ? 'w-4 bg-pink-400' : 'w-2 bg-pink-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <div className="flex justify-center mt-8 px-4">
          <button
            onClick={handleGoToBooking}
            className="bg-pink-100 hover:bg-pink-200 text-stone-800 font-bold text-xl md:text-2xl py-3 md:py-4 px-8 md:px-10 rounded-full shadow-md transition-colors w-full md:w-auto"
            style={{ fontFamily: 'PTSerif-Regular' }}
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowToOrder;
