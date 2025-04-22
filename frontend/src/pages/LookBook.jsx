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
    <div>
      <h1 
        className="text-7xl glow text-white my-6 text-center p-2 animate-fadeIn" 
        style={{
          fontFamily:'bebasNeue-Regular',
          animation: 'fadeIn 0.8s ease-out'
        }}
      >
        LookBook
      </h1>
      <div className='lg:p-20 p-8 items-center justify-center flex flex-col animate-fadeIn'
           style={{ animation: 'fadeIn 0.8s ease-out 0.2s both' }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {nailPhotos.map((photo, index) => (
            <div 
              key={index} 
              className="cursor-pointer" 
              style={{
                animation: `fadeIn 0.8s ease-out ${0.1 * (index + 1)}s both`
              }}
            >
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

const styles = document.createElement('style');
styles.innerHTML = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styles);

export default LookBook;
