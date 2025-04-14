import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Classic Gel Manicure',
    description: 'A traditional manicure that includes nail shaping, cuticle care, and a polish of your choice.',
    price: '$25+',
    image: 'https://img.freepik.com/free-photo/woman-showing-her-beautiful-nails_23-2148697087.jpg',
  },
  {
    id: 2,
    title: 'Gel-X Manicure',
    description: 'Long-lasting gel polish with gel-x extension tips. Lasts up to 3 weeks without chipping.',
    price: '$40+',
    image: 'https://img.freepik.com/free-photo/woman-showing-her-nail-art-fingernails_23-2149820439.jpg',
  },
  {
    id: 3,
    title: 'Acrylic Nail Extensions',
    description: 'Enhance your nails with durable acrylic extensions, shaped and styled to your preference.',
    price: '$60+',
    image: 'https://img.freepik.com/free-photo/healthy-beautiful-manicure-flowers-polish_23-2148766555.jpg',
  },
  {
    id: 4,
    title: 'Parafin Wax Treatment',
    description: 'A relaxing pedicure with exfoliation, massage, and a moisturizing treatment.',
    price: '$50+',
    image: 'https://img.freepik.com/free-photo/close-up-mortar-with-creamy-substance_23-2147809251.jpg',
  },
];

const Services = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const scrollToIndex = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const scrollPosition = index * (320 + 24); // 320px card + 24px margin
    carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const index = Math.round(carousel.scrollLeft / (320 + 24));
    setCurrentIndex(index);
  };

  const handleCheckAllServices = () => {
    window.scrollTo(0, 0);
    navigate('/Services');
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    carousel?.addEventListener('scroll', handleScroll);
    return () => carousel?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="items-center w-full py-12 relative px-[5%]">
      <h2 className="text-8xl font-regular text-center mb-8" style={{ fontFamily: 'Twister' }}>
        Services
      </h2>

      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory px-20 py-3 hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
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

      <div className="flex justify-center mt-4 space-x-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-pink-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={handleCheckAllServices}
          className="px-8 py-3 bg-pink-400 text-white rounded-full hover:bg-pink-500 transition-colors duration-300 font-semibold shadow-md"
        >
          Check All Services
        </button>
      </div>
    </div>
  );
};

export default Services;
