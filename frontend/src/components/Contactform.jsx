import React, { useState } from "react";

import { assets } from "../assets/assets";

const Contactform = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5002/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', comment: '' });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:p-15 p-2  md:mt-[-5%] mt-[-2%] mb-10">
    
        {/* Left side with image */}
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-16 relative">
          <img
            src={assets.Character_Logo} // Replace with your image path
            alt="Nail Artist Cartoon"
            className="w-75 h-full lg:w-100  "
          />
        </div>

        {/* Speech bubble and form */}
        <div className="bg-pink-100 rounded-3xl shadow-lg p-8 sm:px-10 lg:w-3/5 w-9/10 relative">

         

          <h2 className="text-black text-2xl md:text-3xl  text-center mb-4" style={{fontFamily: 'PTSerif-Regular'}}>
            Any Questions?
          </h2>
          <h1 className="text-black text-5xl md:text-6xl  italic mb-8 text-center " style={{fontFamily: 'Twister'}}>
            Let Me know!
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit} style={{fontFamily: 'PTSerif-Regular'}}>
            <div>
              <label className="block text-black text-lg mb-2" htmlFor="name">
                Name:
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-black text-lg mb-2" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label
                className="block text-black text-lg mb-2"
                htmlFor="phone"
              >
                Phone Number:
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-black text-lg mb-2" htmlFor="comment">
                Comment:
              </label>
              <input
                id="comment"
                type="text"
                value={formData.comment}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`bg-pink-400 hover:bg-pink-500 text-black font-medium text-lg px-8 py-3 rounded-full shadow-md transition-all duration-300 block mx-auto md:mx-0 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'SENDING...' : 'SUBMIT'}
            </button>

            {error && (
              <div className="text-red-600 text-center mt-4">
                {error}
              </div>
            )}

            {isSuccess && (
              <div className="text-green-600 text-center mt-4">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
 
  );
};

export default Contactform;
