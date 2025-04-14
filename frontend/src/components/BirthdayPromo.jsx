import React from 'react';

export default function BirthdayPromotion() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Confetti background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <React.Fragment key={i}>
            <div 
              className="absolute bg-yellow-300 rounded-full w-1 h-1"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
            />
            <div 
              className="absolute bg-pink-300 rounded-sm w-1 h-2 rotate-45"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
            <div 
              className="absolute bg-white rounded-sm w-1 h-2"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative w-full px-4 text-center z-10" style={{ fontFamily: 'BebasNeue-Regular' }}>
        {/* Main Text */}
        <h2 className="text-white text-xl italic font-light drop-shadow-lg">
          is it your
        </h2>
        <h1 className="text-white text-3xl font-bold tracking-wide drop-shadow-lg">
          BIRTHDAY MONTH?
        </h1>

        {/* Offer Details */}
        <div className="mt-4 space-y-1">
          <p className="text-gray-100 text-base">receive</p>
          <p className="text-white text-4xl font-bold italic drop-shadow-lg">
            $5 OFF
          </p>
          <p className="text-gray-100 text-base">your next set!</p>
          <p className="text-gray-200 text-xs">(Valid ID needed)</p>
        </div>
      </div>
    </div>
  );
}