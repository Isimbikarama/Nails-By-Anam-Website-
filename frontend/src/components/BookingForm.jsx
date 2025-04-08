import React, { useState, useRef } from 'react';

const Booking = () => {
  const fileInputRef = useRef(null);
  
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    date: '',
    time: '',
    notes: '',
    inspirationPhoto: null
  });

  // State for selected services
  const [selectedServices, setSelectedServices] = useState([]);
  
  // State for drag and drop
  const [dragActive, setDragActive] = useState(false);
  
  // State for preview image
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Locations
  const locations = [
    { id: 'waterloo', name: 'Waterloo' },
    { id: 'markham', name: 'Markham' }
  ];

  // Services list based on website
  const services = [
    { id: 1, name: 'Gel-X Extensions', price: 45 },
    { id: 2, name: 'Natural Nail Manicure', price: 35 },
    { id: 3, name: 'Acrylic Extensions', price: 40 },
    { id: 4, name: 'Nail Art - Simple', price: 10 },
    { id: 5, name: 'Nail Art - Complex', price: 20 },
    { id: 6, name: 'Removal', price: 15 },
    { id: 7, name: 'Gel Polish', price: 30 },
    { id: 8, name: 'French Tips', price: 10 }
  ];

  

  // Calculate total price
  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle service selection
  const handleServiceSelection = (serviceId) => {
    setSelectedServices(prevSelected => {
      if (prevSelected.includes(serviceId)) {
        return prevSelected.filter(id => id !== serviceId);
      } else {
        return [...prevSelected, serviceId];
      }
    });
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  // Process file
  const handleFiles = (file) => {
    if (file.type.startsWith('image/')) {
      setFormData(prevData => ({
        ...prevData,
        inspirationPhoto: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file');
    }
  };

  // Handle button click for file upload
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedServices.length === 0) {
      setSubmitError('Please select at least one service');
      return;
    }
    window.scrollTo(0, 0);
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Find the selected service object
      const selectedService = services.find(s => s.id === selectedServices[0]);
      
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('location', formData.location);
      submitData.append('date', formData.date);
      submitData.append('time', formData.time);
      submitData.append('notes', formData.notes || '');
      submitData.append('serviceName', selectedService.name);
      
      if (formData.inspirationPhoto) {
        submitData.append('image', formData.inspirationPhoto);
      }

      console.log('Submitting booking:', Object.fromEntries(submitData.entries()));

      const response = await fetch('http://localhost:5002/api/bookings', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create booking');
      }

      console.log('Booking created:', result);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        date: '',
        time: '',
        notes: '',
        inspirationPhoto: null
      });
      setSelectedServices([]);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitError(error.message || 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
     
      <div className="max-w-4xl mx-auto p-6">
        {submitSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            <strong className="font-bold">Booking Successful!</strong>
            <p>Thank you for booking with Nails by Anam. You will receive a confirmation email shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-pink-50 p-6 rounded-lg shadow-md">
            
            
            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                {submitError}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-pink-700 mb-2">Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-pink-700 mb-2">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-pink-700 mb-2">Phone Number*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-pink-700 mb-2">Location*</label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="">Select a location</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="date" className="block text-pink-700 mb-2">Date*</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block text-pink-700 mb-2">Time*</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>
            
            <div className="mt-8">
              <label className="block text-pink-700 mb-2">Services*</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map(service => (
                  <div 
                    key={service.id} 
                    className={`border p-3 rounded cursor-pointer transition-colors ${
                      selectedServices.includes(service.id) 
                        ? 'bg-pink-200 border-pink-400' 
                        : 'bg-white border-pink-200 hover:border-pink-300'
                    }`}
                    onClick={() => handleServiceSelection(service.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{service.name}</span>
                      <span className="font-semibold">${service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              {selectedServices.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-pink-300">
                  <h3 className="font-semibold text-pink-800 mb-2">Selected Services:</h3>
                  <ul className="mb-4">
                    {selectedServices.map(serviceId => {
                      const service = services.find(s => s.id === serviceId);
                      return (
                        <li key={serviceId} className="flex justify-between">
                          <span>{service.name}</span>
                          <span>${service.price}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-pink-200 pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <label className="block text-pink-700 mb-2">Inspiration Photo (Optional)</label>
              <div 
                className={`border-2 border-dashed p-6 rounded-lg text-center ${
                  dragActive ? 'border-pink-500 bg-pink-50' : 'border-pink-300'
                } ${previewUrl ? 'p-2' : 'p-6'}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                {previewUrl ? (
                  <div className="relative">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-48 mx-auto rounded" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setFormData(prev => ({ ...prev, inspirationPhoto: null }));
                      }}
                      className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-1 hover:bg-pink-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-pink-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-pink-700 mb-2">Drag & drop your inspiration photo here</p>
                    <p className="text-pink-500 mb-4">or</p>
                    <button
                      type="button"
                      onClick={onButtonClick}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition duration-300"
                    >
                      Browse Files
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <label htmlFor="notes" className="block text-pink-700 mb-2">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Any specific designs, concerns, or requests?"
              ></textarea>
            </div>
            
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition duration-300"
              >
                {isSubmitting ? 'Processing...' : 'Book Now'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default Booking;