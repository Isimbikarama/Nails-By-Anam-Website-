import React, { useState, useEffect, useRef } from 'react';

const ReviewCarousel = () => {
  const reviews = [
    { id: 1, name: "Sarah Johnson", rating: 5, text: "Absolutely love my press-on nails! They look just like salon acrylics but without the damage.", date: "Feb 15, 2025", photo: "https://www.byrdie.com/thmb/kOqCHGmGaY7A6DIt-xRL1nYRobA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/floralfrenchblueberrymilk-0813e5c6c20e4826897fc01abc2bff59.png" },
    { id: 2, name: "Mia Rodriguez", rating: 5, text: "These press-ons are amazing quality and so easy to apply. I get compliments everywhere I go!", date: "Jan 28, 2025", photo: "https://www.refinery29.com/images/11798078.jpg" },
    { id: 3, name: "Taylor Williams", rating: 4, text: "Great design and finish. They lasted me over two weeks with proper application.", date: "Feb 10, 2025", photo: "https://cdn.shopify.com/s/files/1/1520/2544/files/Frenchy_Spring_stamping_bundle_by_jbunny_dips_600x600.png?v=1691828073" },
    { id: 4, name: "Jessica Chen", rating: 5, text: "Beautiful designs and perfect fit! The measuring guide was super helpful.", date: "Mar 5, 2025", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2h_fcf6XYSCofPhC1hhdOrn5tSOscpR-T4Q&s" },
    { id: 5, name: "Amanda Parker", rating: 5, text: "I'm obsessed with these nails! They're so durable and the French design is absolutely perfect.", date: "Feb 22, 2025", photo: "https://www.brit.co/media-library/summer-nail-art-ideas.jpg?id=33655395&width=400&height=400" }];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(4);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const updateVisibleReviews = () => {
      if (window.innerWidth < 640) {
        setVisibleReviews(1);
      } else if (window.innerWidth < 1024) {
        setVisibleReviews(2);
      } else if (window.innerWidth < 1280) {
        setVisibleReviews(3);
      } else {
        setVisibleReviews(4);
      }
    };
    
    updateVisibleReviews();
    window.addEventListener("resize", updateVisibleReviews);
    return () => window.removeEventListener("resize", updateVisibleReviews);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 3000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isHovered, reviews.length]);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="p-8  relative overflow-hidden">
      <h2 className="text-7xl text-center mb-10" style={{ fontFamily: "Twister" }}>The Client Cam</h2>
      
      <div 
        className="relative flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / visibleReviews)}%)` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {reviews.concat(reviews).map((review, index) => (
          <div 
            key={index}
            className="w-1/4 p-4  rounded-lg flex-shrink-0"
            style={{ width: `${100 / visibleReviews}%` }}
          >
            <img src={review.photo} alt={review.name} className="w-full h-64 object-cover rounded-md mb-2" />
            <div className="flex items-center mb-2">
              <h3 className="text-md font-semibold mr-2">{review.name}</h3>
            </div>
            
            <div className="flex mb-2">
              {renderStars(review.rating)}
            </div>
            
            <p className="text-sm text-gray-700 mb-2">{review.text}</p>
            <span className="text-gray-400 text-xs">{review.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;
