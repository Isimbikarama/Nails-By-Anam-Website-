import React, { useState } from 'react';
import Footer from '../components/Footer';  

const nailPhotos = [
  'https://www.refinery29.com/images/11798078.jpg',
  'https://media.allure.com/photos/65cd20c0face5b376c1e5208/master/w_1600%2Cc_limit/nail%2520trends%2520imgs.jpg',
  'https://i.etsystatic.com/17381817/r/il/187498/6700151956/il_fullxfull.6700151956_dg5g.jpg',
  'https://creativenailandbeautytraining.co.uk/cdn/shop/products/image.jpg?v=1659899934',
  'https://www.byrdie.com/thmb/zQ9CxzV_WYJMjs1xpMfX0Uho1zk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Mint-Green-Floral-Nails-Byrdie-Spring-Gel-Nails-9f7304aab67945cf8c3a1fd972026085.jpg',
  'https://www.refinery29.com/images/11798078.jpg',
  'https://media.allure.com/photos/65cd20c0face5b376c1e5208/master/w_1600%2Cc_limit/nail%2520trends%2520imgs.jpg',
  'https://i.etsystatic.com/17381817/r/il/187498/6700151956/il_fullxfull.6700151956_dg5g.jpg',
  'https://creativenailandbeautytraining.co.uk/cdn/shop/products/image.jpg?v=1659899934',
  'https://www.byrdie.com/thmb/zQ9CxzV_WYJMjs1xpMfX0Uho1zk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Mint-Green-Floral-Nails-Byrdie-Spring-Gel-Nails-9f7304aab67945cf8c3a1fd972026085.jpg',
  'https://www.refinery29.com/images/11798078.jpg',
  'https://media.allure.com/photos/65cd20c0face5b376c1e5208/master/w_1600%2Cc_limit/nail%2520trends%2520imgs.jpg',
  'https://i.etsystatic.com/17381817/r/il/187498/6700151956/il_fullxfull.6700151956_dg5g.jpg',
  'https://creativenailandbeautytraining.co.uk/cdn/shop/products/image.jpg?v=1659899934',
  'https://www.byrdie.com/thmb/zQ9CxzV_WYJMjs1xpMfX0Uho1zk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Mint-Green-Floral-Nails-Byrdie-Spring-Gel-Nails-9f7304aab67945cf8c3a1fd972026085.jpg',
  'https://www.refinery29.com/images/11798078.jpg',
  'https://media.allure.com/photos/65cd20c0face5b376c1e5208/master/w_1600%2Cc_limit/nail%2520trends%2520imgs.jpg',
  'https://i.etsystatic.com/17381817/r/il/187498/6700151956/il_fullxfull.6700151956_dg5g.jpg',
  'https://creativenailandbeautytraining.co.uk/cdn/shop/products/image.jpg?v=1659899934',
  'https://www.byrdie.com/thmb/zQ9CxzV_WYJMjs1xpMfX0Uho1zk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Mint-Green-Floral-Nails-Byrdie-Spring-Gel-Nails-9f7304aab67945cf8c3a1fd972026085.jpg',
];

const LookBook = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openPopup = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className='lg:p-20 p-8 items-center justify-center flex flex-col'>
      <h1 className="text-white text-6xl md:text-7xl glow mb-6" style={{ fontFamily: 'BebasNeue-Regular' }}>
        LookBook
      </h1>
      
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
      <Footer/>
    </div>
  );
};

export default LookBook;
