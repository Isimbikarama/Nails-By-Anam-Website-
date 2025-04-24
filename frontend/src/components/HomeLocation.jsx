import React from 'react';
import { assets } from '../assets/assets';


const HomeLocation = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8" style={{fontFamily: 'PTSerif-Regular'}}>
      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-5xl text-gray-900 mb-4" style={{ fontFamily: 'BebasNeue-Regular' }}>
          OUR HOME STUDIO
        </h1>
        <p className="text-xl text-black max-w-3xl mx-auto">
          Experience premium nail care in our cozy, professional home studio environment.
          Every detail has been designed for your comfort and relaxation.
        </p>
      </div>

      {/* Main Studio Image */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={assets.studio3}
            alt="Main Studio View"
            className="w-full h-150 overflow-hidden object-cover"
          />
        </div>
        <p className="text-center text-gray-600 mt-4 italic">Our bright, clean, and inviting workspace</p>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">Studio Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src={assets.studio1}
                alt="Premium Nail Station"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Nail Station</h3>
              <p className="text-gray-600">
                Professional-grade equipment and ergonomic seating for your comfort during your service.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src={assets.studio2}
                alt="Curated Polish Collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mood Lighting</h3>
              <p className="text-gray-600">
                Browse our extensive collection of premium nail polishes and art supplies.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src={assets.studio3}
                alt="Comfort Zone"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Comfort Zone</h3>
              <p className="text-gray-600">
                Enjoy a comfy Atmosphere when you arrive to your appointment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Before/After Gallery */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">Your Transformation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-80 overflow-hidden">
              <img
               src={assets.before}
                alt="Before Treatment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-600 italic">Before your appointment</p>
            </div>
          </div>

          {/* After */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-80 overflow-hidden">
              <img
               src={assets.extra} 
                alt="After Treatment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-600 italic">After our signature service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Location */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92025.53226080346!2d-79.2995385!3d43.8807391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d5efa0324ca9%3A0xf73d52812cb23d63!2sMarkham%2C%20ON!5e0!3m2!1sen!2sca!4v1745506650881!5m2!1sen!2sca"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            ></iframe>




            </div>
            <div className="w-full md:w-1/2 p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Find Our Studio</h3>
              <p className="text-gray-600 mb-6">
                Located in a quiet residential area with easy parking and access to public transportation.
                Location provided after Booking.
              </p>
              <div className="space-y-2">
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Markham, ON
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  (555) 123-4567
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  contact@homestudio.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to experience the difference?</h2>
        <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
          Book Your Appointment
        </button>
      </div>
    </div>
  );
};

export default HomeLocation;