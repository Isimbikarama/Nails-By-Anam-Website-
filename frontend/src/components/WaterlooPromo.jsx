import React from 'react';

export default function WaterlooPromo() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      {/* University Logo */}
      <img 
        src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/University_of_Waterloo_seal.svg/1200px-University_of_Waterloo_seal.svg.png" 
        alt="University of Waterloo Logo" 
        className="w-24 h-auto mb-4"
      />

      {/* Text Content */}
      <div style={{ fontFamily: 'BebasNeue-Regular' }}>
        <h1 className="text-xl font-bold mb-2 text-black">
          ARE YOU A UNIVERSITY OF WATERLOO STUDENT?
        </h1>
        <p className="text-sm font-medium text-black">
          Get your nails on campus at E7 for 15% off! Just book with your school email!
        </p>
      </div>
    </div>
  );
}