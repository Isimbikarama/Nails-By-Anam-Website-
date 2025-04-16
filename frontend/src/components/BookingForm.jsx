import React, { useState, useRef, useEffect } from 'react';

const Booking = () => {
  const fileInputRef = useRef(null);
  const sizingPhotoRef = useRef(null);
  
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    date: '',
    time: '',
    notes: '',
    inspirationPhoto: null,
    sizingPhoto: null,
    acceptedTerms: false,
    serviceType: '',
    previouslySized: false
  });

  // State for nail sizes
  const [nailSizes, setNailSizes] = useState({
    leftThumb: '',
    leftIndex: '',
    leftMiddle: '',
    leftRing: '',
    leftPinky: '',
    rightThumb: '',
    rightIndex: '',
    rightMiddle: '',
    rightRing: '',
    rightPinky: ''
  });

  // State for validation errors
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    phone: '',
    date: '',
    time: ''
  });

  // State for selected services
  const [selectedServices, setSelectedServices] = useState([]);
  
  // State for drag and drop
  const [dragActive, setDragActive] = useState(false);
  const [sizingDragActive, setSizingDragActive] = useState(false);
  
  // State for preview images
  const [previewUrl, setPreviewUrl] = useState(null);
  const [sizingPreviewUrl, setSizingPreviewUrl] = useState(null);
  
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // State for terms dropdown visibility
  const [showTerms, setShowTerms] = useState(false);

  // Set min date to today
  const [minDate, setMinDate] = useState('');
  const [minTime, setMinTime] = useState('');

  // Set minimum date and time on component mount
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setMinDate(formattedDate);

    // Set default min time to current time if today is selected
    updateMinTime(formattedDate);
  }, []);

  // Update minimum time when date changes
  const updateMinTime = (selectedDate) => {
    const today = new Date();
    const selectedDateObj = new Date(selectedDate);
    
    // Reset time field if previously selected time is now invalid
    if (formData.date === selectedDate && formData.time && isDateToday(selectedDate)) {
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      const [selectedHour, selectedMinute] = formData.time.split(':').map(Number);
      
      if (selectedHour < currentHour || (selectedHour === currentHour && selectedMinute < currentMinute)) {
        setFormData(prev => ({ ...prev, time: '' }));
      }
    }
    
    // Only set min time if selected date is today
    if (isDateToday(selectedDate)) {
      const hours = String(today.getHours()).padStart(2, '0');
      const minutes = String(today.getMinutes()).padStart(2, '0');
      setMinTime(`${hours}:${minutes}`);
    } else {
      setMinTime(''); // No min time for future dates
    }
  };
  
  // Check if selected date is today
  const isDateToday = (dateString) => {
    const today = new Date();
    const selectedDate = new Date(dateString);
    return today.getFullYear() === selectedDate.getFullYear() &&
           today.getMonth() === selectedDate.getMonth() &&
           today.getDate() === selectedDate.getDate();
  };

  // Locations
  const locations = [
    { id: 'waterloo', name: 'Waterloo' },
    { id: 'markham', name: 'Markham' }
  ];

  // Service types
  const serviceTypes = [
    { id: 'nail-appointment', name: 'Nail Appointment' },
    { id: 'press-ons', name: 'Press-ons' }
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

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  // Validate phone number (North American format with flexibility)
  const validatePhone = (phone) => {
    // Allow formats like: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
    const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid phone number";
    }
    return "";
  };

  // Validate date is in the future
  const validateDate = (date) => {
    if (!date) return "Date is required";
    
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for comparison
    
    if (selectedDate < today) {
      return "Please select a current or future date";
    }
    return "";
  };

  // Validate time is in the future if date is today
  const validateTime = (time, date) => {
    if (!time) return "Time is required";
    if (!date) return ""; // Skip validation if no date selected
    
    const selectedDate = new Date(date);
    const today = new Date();
    
    // Only validate time if date is today
    if (selectedDate.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear()) {
      
      const [hours, minutes] = time.split(':').map(Number);
      const selectedDateTime = new Date(selectedDate);
      selectedDateTime.setHours(hours, minutes, 0, 0);
      
      if (selectedDateTime <= new Date()) {
        return "Please select a future time";
      }
    }
    return "";
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
    
    // Validate fields
    let error = "";
    switch (name) {
      case 'email':
        error = validateEmail(value);
        setValidationErrors(prev => ({ ...prev, email: error }));
        break;
      case 'phone':
        error = validatePhone(value);
        setValidationErrors(prev => ({ ...prev, phone: error }));
        break;
      case 'date':
        error = validateDate(value);
        setValidationErrors(prev => ({ ...prev, date: error }));
        // Update min time when date changes
        updateMinTime(value);
        // Also validate time if it exists
        if (formData.time) {
          const timeError = validateTime(formData.time, value);
          setValidationErrors(prev => ({ ...prev, time: timeError }));
        }
        break;
      case 'time':
        error = validateTime(value, formData.date);
        setValidationErrors(prev => ({ ...prev, time: error }));
        break;
      default:
        break;
    }
  };

  // Handle nail size input change
  const handleNailSizeChange = (e) => {
    const { name, value } = e.target;
    setNailSizes(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    
    // Remove all non-digit characters
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    // Format based on length
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Handle phone input specifically
  const handlePhoneInput = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    
    // Only update if we successfully formatted the number or it's empty
    if (formattedPhone || e.target.value === '') {
      setFormData(prevData => ({
        ...prevData,
        phone: formattedPhone
      }));
      
      const error = validatePhone(formattedPhone);
      setValidationErrors(prev => ({ ...prev, phone: error }));
    }
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

  // Handle service type selection
  const handleServiceTypeSelection = (typeId) => {
    setFormData(prevData => ({
      ...prevData,
      serviceType: typeId,
      previouslySized: false // Reset sizing status when changing service type
    }));
  };

  // Handle drag events
  const handleDrag = (e, isSizingPhoto = false) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      isSizingPhoto ? setSizingDragActive(true) : setDragActive(true);
    } else if (e.type === 'dragleave') {
      isSizingPhoto ? setSizingDragActive(false) : setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e, isSizingPhoto = false) => {
    e.preventDefault();
    e.stopPropagation();
    isSizingPhoto ? setSizingDragActive(false) : setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0], isSizingPhoto);
    }
  };

  // Handle file input change
  const handleFileChange = (e, isSizingPhoto = false) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0], isSizingPhoto);
    }
  };

  // Process file
  const handleFiles = (file, isSizingPhoto = false) => {
    if (file.type.startsWith('image/')) {
      setFormData(prevData => ({
        ...prevData,
        [isSizingPhoto ? 'sizingPhoto' : 'inspirationPhoto']: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        isSizingPhoto 
          ? setSizingPreviewUrl(reader.result)
          : setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file');
    }
  };

  // Handle button click for file upload
  const onButtonClick = (isSizingPhoto = false) => {
    isSizingPhoto ? sizingPhotoRef.current.click() : fileInputRef.current.click();
  };

  // Toggle terms and conditions visibility
  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  // Validate all form fields
  const validateForm = () => {
    const errors = {
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      date: validateDate(formData.date),
      time: validateTime(formData.time, formData.date)
    };
    
    setValidationErrors(errors);
    
    // Return true if no errors
    return !Object.values(errors).some(error => error !== "");
  };

  // Check if nail sizes are required and if they've been provided
  const validateNailSizes = () => {
    if (formData.serviceType === 'press-ons' && !formData.previouslySized) {
      // Check if all nail sizes are filled
      return !Object.values(nailSizes).some(size => size === '');
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!validateForm()) {
      setSubmitError('Please correct the errors in the form');
      return;
    }
    
    if (formData.serviceType !== 'press-ons' && selectedServices.length === 0) {
      setSubmitError('Please select at least one service');
      return;
    }
    
    if (!formData.serviceType) {
      setSubmitError('Please select a service type');
      return;
    }
    
    if (formData.serviceType === 'press-ons' && !formData.previouslySized && !validateNailSizes()) {
      setSubmitError('Please provide all nail sizes');
      return;
    }
    
    if (formData.serviceType === 'press-ons' && !formData.previouslySized && !formData.sizingPhoto) {
      setSubmitError('Please upload a photo of your hands for sizing');
      return;
    }
    
    if (!formData.acceptedTerms) {
      setSubmitError('Please accept the terms and conditions');
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
      submitData.append('serviceType', formData.serviceType);
      submitData.append('acceptedTerms', formData.acceptedTerms);
      
      if (formData.serviceType === 'press-ons') {
        submitData.append('previouslySized', formData.previouslySized);
        
        if (!formData.previouslySized) {
          // Add nail sizes to form data
          Object.entries(nailSizes).forEach(([finger, size]) => {
            submitData.append(finger, size);
          });
          
          if (formData.sizingPhoto) {
            submitData.append('sizingPhoto', formData.sizingPhoto);
          }
        }
      }
      
      if (formData.inspirationPhoto) {
        submitData.append('inspirationPhoto', formData.inspirationPhoto);
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
        inspirationPhoto: null,
        sizingPhoto: null,
        acceptedTerms: false,
        serviceType: '',
        previouslySized: false
      });
      setSelectedServices([]);
      setPreviewUrl(null);
      setSizingPreviewUrl(null);
      setNailSizes({
        leftThumb: '',
        leftIndex: '',
        leftMiddle: '',
        leftRing: '',
        leftPinky: '',
        rightThumb: '',
        rightIndex: '',
        rightMiddle: '',
        rightRing: '',
        rightPinky: ''
      });
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
                  className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    validationErrors.email ? 'border-red-500' : 'border-pink-300'
                  }`}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-pink-700 mb-2">Phone Number*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneInput}
                  required
                  placeholder="(123) 456-7890"
                  className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    validationErrors.phone ? 'border-red-500' : 'border-pink-300'
                  }`}
                />
                {validationErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                )}
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
                  min={minDate}
                  required
                  className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    validationErrors.date ? 'border-red-500' : 'border-pink-300'
                  }`}
                />
                {validationErrors.date && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.date}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="time" className="block text-pink-700 mb-2">Time*</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  min={isDateToday(formData.date) ? minTime : undefined}
                  required
                  className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    validationErrors.time ? 'border-red-500' : 'border-pink-300'
                  }`}
                />
                {validationErrors.time && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.time}</p>
                )}
              </div>
            </div>
            
            {/* Service Type Selection */}
            <div className="mt-8">
              <label className="block text-pink-700 mb-2">Service Type*</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceTypes.map(type => (
                  <div 
                    key={type.id} 
                    className={`border p-4 rounded cursor-pointer transition-colors text-center ${
                      formData.serviceType === type.id 
                        ? 'bg-pink-200 border-pink-400' 
                        : 'bg-white border-pink-200 hover:border-pink-300'
                    }`}
                    onClick={() => handleServiceTypeSelection(type.id)}
                  >
                    <span className="font-medium">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Press-ons specific fields */}
            {formData.serviceType === 'press-ons' && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-pink-300">
                <h3 className="font-semibold text-pink-800 mb-3">Press-ons Details</h3>
                
                <div className="mb-4">
                  <label className="block text-pink-700 mb-2">Have you been sized with us before?*</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="previouslySized"
                        checked={formData.previouslySized === true}
                        onChange={() => setFormData(prev => ({ ...prev, previouslySized: true }))}
                        className="form-radio h-5 w-5 text-pink-500"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="previouslySized"
                        checked={formData.previouslySized === false}
                        onChange={() => setFormData(prev => ({ ...prev, previouslySized: false }))}
                        className="form-radio h-5 w-5 text-pink-500"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
                
                {formData.previouslySized ? (
                  <div className="bg-pink-100 p-3 rounded-md text-pink-800">
                    Great! We'll use your nail sizes on file for your press-ons order.
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h4 className="font-medium text-pink-700 mb-3">Please enter your nail sizes (mm)*</h4>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div>
                          <h5 className="font-medium mb-2">Left Hand</h5>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <label className="w-20">Thumb:</label>
                              <input
                                type="number"
                                name="leftThumb"
                                value={nailSizes.leftThumb}
                                onChange={handleNailSizeChange}
                                min="1"
                                max="12"
                                step="1"
                                required
                                className="w-16 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="w-20">Index:</label>
                              <input
                                type="number"
                                name="leftIndex"
                                value={nailSizes.leftIndex}
                                onChange={handleNailSizeChange}
                                min="1"
                                max="12"
                                step="1"
                                required
                                className="w-16 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="w-20">Middle:</label>
                              <input
                                type="number"
                                name="leftMiddle"
                                value={nailSizes.leftMiddle}
                                onChange={handleNailSizeChange}
                                min="1"
                                max="12"
                                step="1"
                                required
                                className="w-16 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="w-20">Ring:</label>
                              <input
                                type="number"
                                name="leftRing"
                                value={nailSizes.leftRing}
                                onChange={handleNailSizeChange}
                                min="1"
                                max="12"
                                step="1"
                                required
                                className="w-16 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="w-20">Pinky:</label>
                              <input
                                type="number"
                                name="leftPinky"
                                value={nailSizes.leftPinky}
                                onChange={handleNailSizeChange}
                                min="1"
                                max="12"
                                step="1"
                                required
                                className="w-16 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">Right Hand</h5>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <label className="w-20">Thumb:</label>
                              <input
                                type="number"
                                name="rightThumb"
                                value={nailSizes.rightThumb}
                                onChange={handleNailSizeChange}
                                min="1"
                                max="12"
                                step="1"
                                required
                                className="w-16 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="w-20">Index:</label>
                              <input
                                type="number"
                                name="rightIndex"
                                value={nailSizes.rightIndex}
                               

                                  onChange={handleNailSizeChange}
                                min="1"
                                max="12"
                                step="1"
                                required
                                className="w-16 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="w-20">Middle:</label>
                              <input
                                type="number"
                                name="rightMiddle"
                                value={nailSizes.rightMiddle}
                                onChange={handleNailSizeChange}
                                min="1"
                                max="12"
                                step="1"
                                required
                                className="w-16 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="w-20">Ring:</label>
                              <input
                                type="number"
                                name="rightRing"
                                value={nailSizes.rightRing}
                                onChange={handleNailSizeChange}
                                min="1"
                                max="12"
                                step="1"
                                required
                                className="w-16 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="w-20">Pinky:</label>
                              <input
                                type="number"
                                name="rightPinky"
                                value={nailSizes.rightPinky}
                                onChange={handleNailSizeChange}
                                min="1"
                                max="12"
                                step="1"
                                required
                                className="w-16 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Nail sizing photo upload */}
                    <div className="mt-4">
                      <label className="block text-pink-700 mb-2">
                        Please take a picture of your left and right hand next to a quarter and upload*
                      </label>
                      <div 
                        className={`border-2 border-dashed p-6 rounded-lg text-center ${
                          sizingDragActive ? 'border-pink-500 bg-pink-50' : 'border-pink-300'
                        } ${sizingPreviewUrl ? 'p-2' : 'p-6'}`}
                        onDragEnter={(e) => handleDrag(e, true)}
                        onDragOver={(e) => handleDrag(e, true)}
                        onDragLeave={(e) => handleDrag(e, true)}
                        onDrop={(e) => handleDrop(e, true)}
                      >
                        {sizingPreviewUrl ? (
                          <div className="relative">
                            <img 
                              src={sizingPreviewUrl} 
                              alt="Sizing Preview" 
                              className="max-h-48 mx-auto rounded" 
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setSizingPreviewUrl(null);
                                setFormData(prev => ({ ...prev, sizingPhoto: null }));
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
                            <p className="text-pink-700 mb-2">Drag & drop your hand sizing photo here</p>
                            <p className="text-pink-500 mb-4">or</p>
                            <button
                              type="button"
                              onClick={() => onButtonClick(true)}
                              className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition duration-300"
                            >
                              Browse Files
                            </button>
                            <input
                              ref={sizingPhotoRef}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, true)}
                              className="hidden"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {/* Services section - should only show when service type is NOT press-ons */}
{formData.serviceType !== 'press-ons' && (
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
)}
            
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
            
            {/* Terms and Conditions Section */}
            <div className="mt-8">
              <div className="border border-pink-300 rounded-lg bg-white overflow-hidden">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer bg-pink-100 hover:bg-pink-200 transition-colors"
                  onClick={toggleTerms}
                >
                  <h3 className="font-semibold text-pink-700">Terms and Conditions</h3>
                  <div className="text-pink-500">
                    {showTerms ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                
                {showTerms && (
                  <div className="p-4 text-sm text-gray-700 max-h-64 overflow-y-auto">
                    <h4 className="font-semibold mb-2">Booking Policy</h4>
                    <p className="mb-3">By making a booking with Nails by Anam, you agree to the following terms and conditions:</p>
                    
                    <h5 className="font-semibold mt-3">Cancellation Policy</h5>
                    <p className="mb-2">• Appointments must be cancelled or rescheduled at least 24 hours in advance.</p>
                    <p className="mb-2">• Late cancellations (less than 24 hours notice) may incur a 50% charge of the service price.</p>
                    <p className="mb-3">• No-shows will be charged the full service amount.</p>
                    
                    <h5 className="font-semibold mt-3">Arrival Time</h5>
                    <p className="mb-2">• Please arrive 5-10 minutes before your scheduled appointment time.</p>
                    <p className="mb-3">• Late arrivals may result in shortened service time or rescheduling if necessary.</p>
                    
                    <h5 className="font-semibold mt-3">Health & Safety</h5>
                    <p className="mb-2">• Please inform us of any allergies, medical conditions, or special requirements before your appointment.</p>
                    <p className="mb-3">• We reserve the right to refuse service if there are any contagious nail or skin conditions.</p>
                    
                    <h5 className="font-semibold mt-3">Satisfaction Guarantee</h5>
                    <p className="mb-2">• If you are not satisfied with your service, please let us know within 7 days and we will make it right.</p>
                    <p className="mb-3">• Refunds are provided at our discretion.</p>
                    
                    <h5 className="font-semibold mt-3">Deposits</h5>
                    <p className="mb-2">• For services over $50, a deposit may be required to secure your booking.</p>
                    <p className="mb-2">• Deposits are non-refundable for cancellations with less than 24 hours notice.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 text-pink-500 border-pink-300 rounded focus:ring-pink-400"
                />
                <label htmlFor="acceptTerms" className="ml-2 text-gray-700">
                  I have read and agree to the terms and conditions*
                </label>
              </div>
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