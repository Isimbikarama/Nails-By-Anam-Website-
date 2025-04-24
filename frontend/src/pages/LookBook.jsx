import React, { useState } from 'react';
import Footer from '../components/Footer';  
import { nailPhotos } from '../assets/assets';

const LookBook = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openPopup = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div>
<div className='fade-in'>  
    <h1 className="text-7xl glow text-white my-6 text-center p-2" style={{fontFamily:'bebasNeue-Regular'}}>LookBook</h1>
    <h2 className='text-2xl text-white text-center' style={{fontFamily: 'PtSerif-Regular'}}>Get Inspo for your next Nails By Anam Set!</h2>
    </div>  
    <div className='lg:p-20 p-8 items-center justify-center flex flex-col'>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {nailPhotos.map((photo, index) => (
          <div key={index} className="cursor-pointer">
            <img
              src={photo}
              alt={`Nail design ${index + 1}`}
              className="w-full h-full object-cover rounded-md border-2 border-white shadow-lg"
              onClick={() => openPopup(photo)}
            />
          </div>
        ))}
      </div>
      
      {selectedImage && (
        <div
          className="fixed inset-0 backdrop-blur flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div className="relative w-96 h-96 bg-white p-4 flex items-center justify-center rounded-lg shadow-lg">
            <img
              src={selectedImage}
              alt="Selected Nail Design"
              className="w-full h-full scale-125 object-cover rounded-md"
            />
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-white text-2xl  p-2 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}
      </div>
      <Footer/>
    </div>
  );
};

export default LookBook;
