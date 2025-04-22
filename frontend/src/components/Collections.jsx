import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const collections = [
  {
    id: 1,
    title: 'Super Hero Collection',
    description: 'Bold designs inspired by your favorite comic book characters.',
    price: '$65',
    images: [
      'https://nailzinbloom.com/wp-content/uploads/2024/10/image-82.png',
      'https://nailzinbloom.com/wp-content/uploads/2024/10/image-82.png',
      'https://nailzinbloom.com/wp-content/uploads/2024/10/image-82.png',
      'https://dreammanicures.com/wp-content/uploads/2024/07/glamnailsbygriselda-hello-kitty-french-tips-600x600.jpeg'
    ],
  },
  {
    id: 2,
    title: 'Sanrio Collection',
    description: 'Cute and playful designs featuring Sanrio characters and themes.',
    price: '$70',
    images: [
      'https://dreammanicures.com/wp-content/uploads/2024/07/glamnailsbygriselda-hello-kitty-french-tips-600x600.jpeg',
      'https://nailzinbloom.com/wp-content/uploads/2024/10/image-82.png',
      'https://dreammanicures.com/wp-content/uploads/2024/07/glamnailsbygriselda-hello-kitty-french-tips-600x600.jpeg',
      'https://dreammanicures.com/wp-content/uploads/2024/07/glamnailsbygriselda-hello-kitty-french-tips-600x600.jpeg'
    ],
  },
  {
    id: 3,
    title: 'Gaming Collection',
    description: 'Nail art inspired by popular video games and gaming culture.',
    price: '$65',
    images: [
      'https://i.redd.it/fb4gbjyhatl41.jpg',
      'https://nailzinbloom.com/wp-content/uploads/2024/10/image-82.png',
      'https://i.redd.it/fb4gbjyhatl41.jpg',
      'https://i.redd.it/fb4gbjyhatl41.jpg'
    ],
  },
  {
    id: 4,
    title: 'Luxury Collection',
    description: 'Elegant and sophisticated designs with premium finishes.',
    price: '$80',
    images: [
      'https://mluxnails.ca/photos/home/1.jpg',
      'https://nailzinbloom.com/wp-content/uploads/2024/10/image-82.png',
      'https://mluxnails.ca/photos/home/1.jpg',
      'https://mluxnails.ca/photos/home/1.jpg'
    ],
  },
];

const Collections = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate = useNavigate();

  const scrollToIndex = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const scrollPosition = index * (320 + 24);
    carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const index = Math.round(carousel.scrollLeft / (320 + 24));
    setCurrentIndex(index);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    carousel?.addEventListener('scroll', handleScroll);
    return () => carousel?.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (collection) => {
    setSelectedCollection(collection);
    setActiveImageIndex(0);
  };

  const closeModal = () => {
    setSelectedCollection(null);
    setActiveImageIndex(0);
  };

  const handleLookBook = () => {
    window.scrollTo(0, 0);
    navigate('/LookBook');
  };

  return (
    <div className="items-center w-full py-12 relative px-[5%]">
      

      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory px-20 py-3 hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              onClick={() => openModal(collection)}
              className="cursor-pointer flex-shrink-0 w-[320px] mr-6 snap-center"
            >
              <div className="bg-white rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 ease-in-out">
                <img
                  src={collection.images[0]}
                  alt={collection.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{collection.title}</h3>
                  <p className="text-gray-600">{collection.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {collections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-pink-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      {selectedCollection && (
        <div className="fixed inset-0 flex justify-center backdrop-blur items-center z-50">
          <div className="relative bg-white rounded-2xl shadow-lg w-[90%] max-w-4xl p-8 mx-auto my-auto transform transition-all">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4 text-center">{selectedCollection.title}</h3>

              <div className="w-full mb-4">
                <img
                  src={selectedCollection.images[activeImageIndex]}
                  alt={`${selectedCollection.title} - View ${activeImageIndex + 1}`}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
              </div>

              <div className="flex justify-center gap-2 mb-4 w-full overflow-x-auto">
                {selectedCollection.images.map((image, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                      activeImageIndex === idx ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${selectedCollection.title} thumbnail ${idx + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                ))}
              </div>

              <p className="text-gray-700 mb-4 text-center">{selectedCollection.description}</p>
              <p className="text-xl font-semibold text-gray-900 text-center mb-4">
                Starting at: {selectedCollection.price}
              </p>
              <button className="bg-pink-500 text-white py-2 px-6 rounded-full hover:bg-pink-600 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-3 py-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'PTSerif-Regular' }}>
          100% Custom and Handmade
        </h2>

        <p className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: 'PTSerif-Regular' }}>
          Check out the look book for more inspo!
        </p>

        <button
          onClick={handleLookBook}
          className="bg-pink-100 hover:bg-pink-200 transition-colors duration-300 py-4 px-12 rounded-full shadow-md"
          style={{ fontFamily: 'Twister' }}
        >
          <span className="text-3xl">Look Book</span>
        </button>
      </div>
    </div>
  );
};

export default Collections;