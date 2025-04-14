import React, { useRef, useState, useEffect } from 'react';
import WaterlooPromo from './WaterlooPromo';
import BirthdayPromo from './BirthdayPromo';
import ReferralPromotion from './ReferalPromotion';

const promos = [
  { id: 1, component: <WaterlooPromo />, bgClass: "bg-rose-50" },
  { id: 2, component: <BirthdayPromo />, bgClass: "bg-pink-500" },
  { id: 3, component: <ReferralPromotion />, bgClass: "bg-pink-100" },
];

const CardWrapper = ({ children, bgClass }) => (
  <div className={`${bgClass} rounded-2xl shadow-lg flex-shrink-0 w-full md:w-[320px] h-[400px] md:mr-6 snap-center border border-gray-200`}>
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-hidden">
        {children}
      </div>
    </div>
  </div>
);

const Promotions = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardWidth = carousel.offsetWidth;
    const scrollPosition = index * cardWidth;
    carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardWidth = carousel.offsetWidth;
    const index = Math.round(carousel.scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    carousel?.addEventListener('scroll', handleScroll);
    return () => carousel?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="py-12 px-[5%]">
      <h1
        className="text-7xl text-black  text-center mb-10"
        style={{ fontFamily: 'Twister' }}
      >
        Promotions
      </h1>

      {/* Desktop View */}
      <div className="hidden md:flex justify-center flex-wrap gap-6">
        {promos.map((promo) => (
          <CardWrapper key={promo.id} bgClass={promo.bgClass}>
            {promo.component}
          </CardWrapper>
        ))}
      </div>

      {/* Mobile Carousel View */}
      <div className="md:hidden relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        >
          {promos.map((promo) => (
            <div className="min-w-full px-4 box-border" key={promo.id}>
              <CardWrapper bgClass={promo.bgClass}>
                {promo.component}
              </CardWrapper>
            </div>
          ))}
        </div>

        {/* Hide scrollbar on mobile */}
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentIndex === index ? 'bg-rose-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promotions;