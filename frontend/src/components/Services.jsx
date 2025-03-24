import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Classic Gel Manicure',
    description: 'A traditional manicure that includes nail shaping, cuticle care, and a polish of your choice.',
    price: '$25+',
    image: 'https://img.freepik.com/free-photo/woman-showing-her-beautiful-nails_23-2148697087.jpg?t=st=1742829881~exp=1742833481~hmac=85bc064bc13fc18b2e3323079c04da0d6e640bad7f7cfc1e95e6a15873acc085&w=1800',
  },
  {
    id: 2,
    title: 'Gel-X Manicure',
    description: 'Long-lasting gel polish with gel-x extension tips. Lasts up to 3 weeks without chipping.',
    price: '$40+',
    image: 'https://img.freepik.com/free-photo/woman-showing-her-nail-art-fingernails_23-2149820439.jpg?t=st=1742829883~exp=1742833483~hmac=bb428074118a36abc49104a68cd22286dbd5c1f4781897ee97c5a32d42dc13b8&w=2000',
  },
  {
    id: 3,
    title: 'Acrylic Nail Extensions',
    description: 'Enhance your nails with durable acrylic extensions, shaped and styled to your preference.',
    price: '$60+',
    image: 'https://img.freepik.com/free-photo/healthy-beautiful-manicure-flowers-polish_23-2148766555.jpg?t=st=1742830147~exp=1742833747~hmac=3ef05fd8347d792bf27576ffa5b36bfc113ed46e9e4c040e2d871cb908a4901c&w=2000',
  },
  {
    id: 4,
    title: 'Parafin Wax Treatment',
    description: 'A relaxing pedicure with exfoliation, massage, and a moisturizing treatment.',
    price: '$50+',
    image: 'https://img.freepik.com/free-photo/close-up-mortar-with-creamy-substance_23-2147809251.jpg?t=st=1742830275~exp=1742833875~hmac=15402de13c0c7be3150394821bf5c2b951c180b42d0c18e4b86d949ddfb33918&w=2000',
  },
];


const Services = () => {
  const carouselRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);
  
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

  const toggleAllServices = () => {
    setShowAllServices(!showAllServices);
  };

  const navigate = useNavigate();

  const handleCheckAllServices = () => {
    window.scrollTo(0, 0); // Scroll to top
    navigate('/Services');
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

      {/* Check All Services Button */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={handleCheckAllServices}
          className="px-8 py-3 bg-pink-400 text-white rounded-full hover:bg-pink-500 transition-colors duration-300 font-semibold shadow-md"
        >
          Check All Services
        </button>
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

      {/* Modal with 10% opacity black background overlay */}
      {selectedService && (
        <div className="fixed inset-0 glow flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm ">
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

      {/* All Services Modal */}
      {showAllServices && (
        <div className="fixed inset-0 glow flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-lg w-[90%] max-w-4xl p-8 mx-auto my-auto transform transition-all max-h-[80vh] overflow-y-auto">
            <button
              onClick={toggleAllServices}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">All Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                  <p className="text-lg font-semibold text-gray-900">Price: {service.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;