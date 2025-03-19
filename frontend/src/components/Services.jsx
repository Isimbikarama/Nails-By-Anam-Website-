import React, { useEffect, useRef, useState } from 'react';

const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Building responsive and dynamic websites with modern technologies.',
    price: '$1500',
    image: 'https://img.freepik.com/free-photo/woman-showing-her-beautiful-nails_23-2148697087.jpg?t=st=1742239069~exp=1742242669~hmac=0d7c9e38766cebba22112dd55f34b99b0a5f32f37dd24ee226c690a3720d019c&w=1800',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'Crafting intuitive and beautiful user interfaces for better user experience.',
    price: '$1200',
    image: 'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
  },
  {
    id: 3,
    title: 'SEO Optimization',
    description: 'Improving website visibility and search engine rankings.',
    price: '$800',
    image: 'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
  },
  {
    id: 4,
    title: 'Digital Marketing',
    description: 'Strategic online marketing to grow your business presence.',
    price: '$1000',
    image: 'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
  },
];

const Services = () => {
  const carouselRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  
  // Set up refs instead of state to avoid re-renders during scrolling
  const isTransitioning = useRef(false);
  const lastScrollPos = useRef(0);
  const scrollDirection = useRef(null);
  const itemWidth = useRef(320 + 24); // Width (320px) + margin-right (24px = 6 in rem)
  
  // Create a large number of duplicates for truly seamless scrolling
  const repeats = 5; // Number of times to repeat the original array
  const infiniteServices = Array(repeats).fill().flatMap(() => services);
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    // Initialize at approximately 1/3 of the way through the carousel
    // This gives us room to scroll both left and right
    const initialScrollPosition = Math.floor((infiniteServices.length / 3) * itemWidth.current);
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
      const totalWidth = services.length * itemWidth.current * repeats;
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
          const centerPosition = Math.floor((infiniteServices.length / 2) * itemWidth.current) - 
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
  
  const openModal = (service) => {
    setSelectedService(service);
  };
  
  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="items-center w-full py-12 relative px-[5%]">
      <h2 className="text-8xl font-regular text-center mb-8" style={{ fontFamily: 'Twister' }}>
        Services
      </h2>

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
          {infiniteServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              onClick={() => openModal(service)}
              className="cursor-pointer flex-shrink-0 w-[320px] mr-6 snap-center"
            >
              <div className="bg-white rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 ease-in-out">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
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

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-8 mx-auto my-auto transform transition-all">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4 text-center">{selectedService.title}</h3>
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-700 mb-4 text-center">{selectedService.description}</p>
              <p className="text-xl font-semibold text-gray-900 text-center">
                Price: {selectedService.price}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;