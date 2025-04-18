import React, { useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom';

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
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Set up refs instead of state to avoid re-renders during scrolling
  const isTransitioning = useRef(false);
  const lastScrollPos = useRef(0);
  const scrollDirection = useRef(null);
  const itemWidth = useRef(320 + 24); // Width (320px) + margin-right (24px = 6 in rem)
  
  // Create a large number of duplicates for truly seamless scrolling
  const repeats = 5; // Number of times to repeat the original array
  const infiniteCollections = Array(repeats).fill().flatMap(() => collections);
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    // Initialize at approximately 1/3 of the way through the carousel
    // This gives us room to scroll both left and right
    const initialScrollPosition = Math.floor((infiniteCollections.length / 3) * itemWidth.current);
    carousel.scrollLeft = initialScrollPosition;
    lastScrollPos.current = initialScrollPosition;
    
    let scrollTimeout;
    
    const handleScroll = () => {
      if (isTransitioning.current || !carousel) return;
      
      // Determine scroll direction
      const currentScroll = carousel.scrollLeft;
      scrollDirection.current = currentScroll > lastScrollPos.current ? 'right' : 'left';
      lastScrollPos.current = currentScroll;
      
      // Calculate threshold positions - when we're about to run out of items
      const totalWidth = collections.length * itemWidth.current * repeats;
      const nearEnd = totalWidth - (carousel.clientWidth * 1.5);
      const nearStart = carousel.clientWidth * 0.5;
      
      // If we're near the end or start, reset the position
      if (currentScroll > nearEnd || currentScroll < nearStart) {
        clearTimeout(scrollTimeout);
        
        // Wait for any inertia scrolling to settle
        scrollTimeout = setTimeout(() => {
          // Prevent recursive scroll events during the reset
          isTransitioning.current = true;
          
          // Disable smooth scrolling for the reset
          carousel.style.scrollBehavior = 'auto';
          
          // Calculate new position (approximately middle of the list)
          const centerPosition = Math.floor((infiniteCollections.length / 2) * itemWidth.current) - 
                                (carousel.clientWidth / 2) + (itemWidth.current / 2);
          
          carousel.scrollLeft = centerPosition;
          lastScrollPos.current = centerPosition;
          
          // Re-enable smooth scrolling after a short delay
          setTimeout(() => {
            carousel.style.scrollBehavior = 'smooth';
            isTransitioning.current = false;
          }, 50);
        }, 50);
      }
    };
    
    carousel.addEventListener('scroll', handleScroll);
    
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  // Custom scroll with acceleration/deceleration for smoother experience
  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel || isTransitioning.current) return;
    
    // Calculate scroll distance - one item width
    const scrollDistance = direction === 'left' ? -itemWidth.current : itemWidth.current;
    
    carousel.scrollBy({
      left: scrollDistance,
      behavior: 'smooth'
    });
  };
  
  const openModal = (collection) => {
    setSelectedCollection(collection);
    setActiveImageIndex(0);
  };
  
  const closeModal = () => {
    setSelectedCollection(null);
    setActiveImageIndex(0);
  };

  const navigate = useNavigate(); 
  
  const handleLookBook = () => {
    window.scrollTo(0, 0); // Scroll to top
    navigate('/LookBook');
  }

  return (
    <div>
    <div className="items-center w-full relative px-[5%] " >
  
      {/* Arrows */}
      <button
        onClick={() => scrollCarousel('left')}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-200 z-10"
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => scrollCarousel('right')}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-200 z-10"
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Carousel Content */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory px-20 py-3 hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {infiniteCollections.map((collection, index) => (
            <div
              key={`${collection.id}-${index}`}
              onClick={() => openModal(collection)}
              className="cursor-pointer flex-shrink-0 w-[400px]  mr-6 snap-center"
            >
            <div className="bg-white rounded-2xl  shadow-md hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden">
                <div className="p-2">
                  <img
                    src={collection.images[0]}
                    alt={collection.title}
                    className="w-full scale-125 h-48 object-cover"
                  />
                </div>
              </div>
              <h3 className="p-3 text-center text-xl font-semibold mb-1" style={{fontFamily:"PTSerif-Regular"}}>{collection.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Modal with expanded image gallery */}
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
              
              {/* Main image display */}
              <div className="w-full mb-4">
                <img
                  src={selectedCollection.images[activeImageIndex]}
                  alt={`${selectedCollection.title} - View ${activeImageIndex + 1}`}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
              </div>
              
              {/* Thumbnail gallery */}
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

    </div>
    <div className="w-full px-3 py-12 flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl md:text-5xl  mb-4" style={{ fontFamily: 'PTSerif-Regular' }}>
        100% Custom and Handmade
      </h2>
      
      <p className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: 'PTSerif-Regular' }}>
        Check out the look book for more inspo!
      </p>
      
      <button onClick={handleLookBook}
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