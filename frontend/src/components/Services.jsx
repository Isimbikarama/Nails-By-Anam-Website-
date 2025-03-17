import React, { useRef, useState } from 'react';

const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Building responsive and dynamic websites with modern technologies.',
    price: '$1500',
    image: 'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
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

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -350,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 350,
        behavior: 'smooth',
      });
    }
  };

  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <div className=" border border-gray-400 w-full py-12 px-7 relative">
      <h2
        className="text-8xl font-regular text-center mb-8"
        style={{ fontFamily: 'Twister' }}
      >
        Services
      </h2>

      {/* Arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-200 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-200 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hidden scroll-smooth snap-x snap-mandatory px-4"
      >
        {services.map((service) => (
          <div
            key={service.id}
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

      {/* Modal Popup */}
      {selectedService && (
        <div className="fixed inset-0 bg-white bg-opacity-10 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-8">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              ✕
            </button>

            {/* Modal Content */}
            <h3 className="text-2xl font-bold mb-4">{selectedService.title}</h3>
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">{selectedService.description}</p>
            <p className="text-xl font-semibold text-gray-900">
              Price: {selectedService.price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;




