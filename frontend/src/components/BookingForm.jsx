import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';

const services = {
  manicures: [
    { id: 1, name: 'Basic Manicure', price: 20, duration: 30 },
    { id: 2, name: 'Gel Manicure', price: 35, duration: 45 },
    { id: 3, name: 'French Manicure', price: 40, duration: 50 },
    { id: 4, name: 'Luxury Spa Manicure', price: 50, duration: 60 }
  ],
  acrylicGelX: [
    { id: 5, name: 'Acrylic Full Set', price: 55, duration: 75 },
    { id: 6, name: 'Acrylic Fill', price: 40, duration: 50 },
    { id: 7, name: 'Gel-X Full Set', price: 65, duration: 75 },
    { id: 8, name: 'Gel-X Fill', price: 55, duration: 60 }
  ],
  addOns: [
    { id: 9, name: 'Paraffin Wax Treatment', price: 10, duration: 15 },
    { id: 10, name: 'Soak-Off Removal', price: 15, duration: 15 }
  ]
};

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
    inspirationPhotos: [],
    sizingPhotos: [],
    acceptedTerms: false,
    serviceType: '',
    previouslySized: false,
    knowsMeasurements: null // Add this new state property
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
  const [previewUrls, setPreviewUrls] = useState([]);
  const [sizingPreviewUrls, setSizingPreviewUrls] = useState([]);
  
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // State for terms dropdown visibility
  const [showTerms, setShowTerms] = useState(false);

  // Set min date to today
  const [minDate, setMinDate] = useState('');
  const [minTime, setMinTime] = useState('');

  // State for available time slots
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);

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

  // Calculate total duration when services change
  useEffect(() => {
    if (formData.serviceType === 'nail-appointment' && selectedServices.length > 0) {
      const duration = selectedServices.reduce((total, serviceId) => {
        const service = [...services.manicures, ...services.acrylicGelX, ...services.addOns]
          .find(s => s.id === serviceId);
        return total + (service ? service.duration : 0);
      }, 0);
      setTotalDuration(duration);
    }
  }, [selectedServices]);

  // Fetch available time slots when date or services change
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (formData.date && formData.serviceType === 'nail-appointment' && totalDuration > 0) {
        try {
          const response = await fetch(
            `http://localhost:5002/api/availability?date=${formData.date}&duration=${totalDuration}`
          );
          const slots = await response.json();
          setAvailableTimeSlots(slots);
        } catch (error) {
          console.error('Failed to fetch time slots:', error);
        }
      }
    };
    fetchTimeSlots();
  }, [formData.date, totalDuration]);

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

  // Calculate total price
  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = [...services.manicures, ...services.acrylicGelX, ...services.addOns]
        .find(s => s.id === serviceId);
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
        updateMinTime(value);
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
    
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Handle phone input specifically
  const handlePhoneInput = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    
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
      previouslySized: false,
      knowsMeasurements: null
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesChange({ target: { files: e.dataTransfer.files } }, isSizingPhoto);
    }
  };

  // Handle file input change
  const handleFilesChange = (e, isSizingPhoto = false) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).slice(0, 4);
      if (isSizingPhoto) {
        setFormData(prev => ({ ...prev, sizingPhotos: filesArray }));
        Promise.all(filesArray.map(file => new Promise(resolve => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        }))).then(urls => setSizingPreviewUrls(urls));
      } else {
        setFormData(prev => ({ ...prev, inspirationPhotos: filesArray }));
        Promise.all(filesArray.map(file => new Promise(resolve => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        }))).then(urls => setPreviewUrls(urls));
      }
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
      date: formData.serviceType === 'nail-appointment' ? validateDate(formData.date) : '',
      time: formData.serviceType === 'nail-appointment' ? validateTime(formData.time, formData.date) : ''
    };
    
    setValidationErrors(errors);
    
    // Only check date/time errors for nail appointments
    const fieldsToValidate = formData.serviceType === 'nail-appointment' 
      ? Object.values(errors)
      : [errors.email, errors.phone];
    
    return !fieldsToValidate.some(error => error !== "");
  };

  // Check if nail sizes are required and if they've been provided
  const validateNailSizes = () => {
    if (formData.serviceType === 'press-ons' && formData.knowsMeasurements) {
      return !Object.values(nailSizes).some(size => size === '');
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitError('Please correct the errors in the form');
      return;
    }
    
    if (!formData.serviceType) {
      setSubmitError('Please select a service type');
      return;
    }

    if (formData.serviceType === 'nail-appointment') {
      if (selectedServices.length === 0) {
        setSubmitError('Please select at least one service');
        return;
      }
      if (!formData.date || !formData.time) {
        setSubmitError('Please select a date and time for your appointment');
        return;
      }
    }
    
    if (formData.serviceType === 'press-ons') {
      if (formData.knowsMeasurements === null) {
        setSubmitError('Please indicate if you know your nail measurements');
        return;
      }
      if (formData.knowsMeasurements && !validateNailSizes()) {
        setSubmitError('Please provide all nail sizes');
        return;
      }
      if (!formData.knowsMeasurements && formData.sizingPhotos.length === 0) {
        setSubmitError('Please upload photos of your hands for sizing');
        return;
      }
    }
    
    if (!formData.acceptedTerms) {
      setSubmitError('Please accept the terms and conditions');
      return;
    }
    
    window.scrollTo(0, 0);
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('location', formData.location);
      submitData.append('serviceType', formData.serviceType);
      submitData.append('notes', formData.notes || '');
      submitData.append('acceptedTerms', formData.acceptedTerms);
      
      // Only append date/time for nail appointments
      if (formData.serviceType === 'nail-appointment') {
        submitData.append('date', formData.date);
        submitData.append('time', formData.time);
      }
      
      if (formData.serviceType === 'press-ons') {
        submitData.append('serviceName', 'Press-on Nails');
        submitData.append('duration', '60'); // Default duration for press-ons
        submitData.append('knowsMeasurements', formData.knowsMeasurements);
        
        if (formData.knowsMeasurements) {
          Object.entries(nailSizes).forEach(([finger, size]) => {
            submitData.append(finger, size);
          });
        } else {
          if (formData.sizingPhotos.length > 0) {
            formData.sizingPhotos.forEach((file, index) => {
              submitData.append(`sizingPhoto_${index}`, file);
            });
          }
        }
      } else if (formData.serviceType === 'nail-appointment' && selectedServices.length > 0) {
        const selectedServiceNames = selectedServices.map(serviceId => {
          const service = [...services.manicures, ...services.acrylicGelX, ...services.addOns]
            .find(s => s.id === serviceId);
          return service.name;
        });
        submitData.append('serviceName', selectedServiceNames.join(', '));
      }
      
      if (formData.inspirationPhotos.length > 0) {
        formData.inspirationPhotos.forEach((file, index) => {
          submitData.append(`inspirationPhoto_${index}`, file);
        });
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
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        date: '',
        time: '',
        notes: '',
        inspirationPhotos: [],
        sizingPhotos: [],
        acceptedTerms: false,
        serviceType: '',
        previouslySized: false,
        knowsMeasurements: null
      });
      setSelectedServices([]);
      setPreviewUrls([]);
      setSizingPreviewUrls([]);
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
            </div>
            
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
            
            {formData.serviceType === 'press-ons' && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-pink-300">
                <h3 className="font-semibold text-pink-800 mb-3">Press-ons Details</h3>
                
                <div className="mb-4">
                  <label className="block text-pink-700 mb-2">Do you know your mm measurements of all nails?*</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="knowsMeasurements"
                        checked={formData.knowsMeasurements === true}
                        onChange={() => setFormData(prev => ({ ...prev, knowsMeasurements: true }))}
                        className="form-radio h-5 w-5 text-pink-500"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="knowsMeasurements"
                        checked={formData.knowsMeasurements === false}
                        onChange={() => setFormData(prev => ({ ...prev, knowsMeasurements: false }))}
                        className="form-radio h-5 w-5 text-pink-500"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                {formData.knowsMeasurements ? (
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
                ) : formData.knowsMeasurements === false ? (
                  <div className="mt-4">
                    <label className="block text-pink-700 mb-2">
                      Please take pictures of your left and right hand next to a quarter and upload (max 4)*
                    </label>
                    <div 
                      className={`border-2 border-dashed p-6 rounded-lg text-center ${
                        sizingDragActive ? 'border-pink-500 bg-pink-50' : 'border-pink-300'
                      }`}
                      onDragEnter={(e) => handleDrag(e, true)}
                      onDragOver={(e) => handleDrag(e, true)}
                      onDragLeave={(e) => handleDrag(e, true)}
                      onDrop={(e) => handleDrop(e, true)}
                    >
                      {sizingPreviewUrls.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          {sizingPreviewUrls.map((url, index) => (
                            <div key={index} className="relative">
                              <img 
                                src={url} 
                                alt={`Sizing Preview ${index + 1}`} 
                                className="max-h-48 mx-auto rounded" 
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setSizingPreviewUrls(prev => prev.filter((_, i) => i !== index));
                                  setFormData(prev => ({
                                    ...prev,
                                    sizingPhotos: prev.sizingPhotos.filter((_, i) => i !== index)
                                  }));
                                }}
                                className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-1 hover:bg-pink-600"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-pink-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-pink-700 mb-2">Drag & drop your hand sizing photos here</p>
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
                            multiple
                            onChange={(e) => handleFilesChange(e, true)}
                            className="hidden"
                          />
                        </>
                      )}
                    </div>
                  </div>
                ) : null}
                
                <div className="mt-4">
                  <p className="text-gray-600 italic mb-2">
                    Note: For press-on orders, we'll contact you to arrange a suitable delivery/pickup time.
                  </p>
                </div>
              </div>
            )}
            
            {formData.serviceType !== 'press-ons' && (
              <div className="mt-8">
                <label className="block text-pink-700 mb-2">Services*</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[...services.manicures, ...services.acrylicGelX, ...services.addOns].map(service => (
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
                        const service = [...services.manicures, ...services.acrylicGelX, ...services.addOns]
                          .find(s => s.id === serviceId);
                        return (
                          <li key={serviceId} className="flex justify-between">
                            <span>{service.name}</span>
                            <span>${service.price}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="border-t border-pink-200 pt-2 flex justify-between font-bold text-lg">
                      <span>Estimated Total:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {formData.serviceType === 'nail-appointment' && selectedServices.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-pink-800 mb-4">
                  Appointment Details (Total Duration: {totalDuration} minutes)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-pink-700 mb-2">Select Date*</label>
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
                  
                  {formData.date && availableTimeSlots.length > 0 && (
                    <div>
                      <label htmlFor="time" className="block text-pink-700 mb-2">Select Time*</label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                      >
                        <option value="">Choose a time slot</option>
                        {availableTimeSlots.map(slot => (
                          <option key={slot.time} value={slot.time}>
                            {slot.time}
                          </option>
                        ))}
                      </select>
                      {validationErrors.time && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.time}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <label className="block text-pink-700 mb-2">Inspiration Photos (Optional, max 4)</label>
              <div className="flex flex-col gap-4">
                <div 
                  className={`border-2 border-dashed p-6 rounded-lg text-center ${
                    dragActive ? 'border-pink-500 bg-pink-50' : 'border-pink-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  {previewUrls.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={url} 
                            alt={`Preview ${index + 1}`} 
                            className="max-h-48 mx-auto rounded" 
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewUrls(prev => prev.filter((_, i) => i !== index));
                              setFormData(prev => ({
                                ...prev,
                                inspirationPhotos: prev.inspirationPhotos.filter((_, i) => i !== index)
                              }));
                            }}
                            className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-1 hover:bg-pink-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-pink-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-pink-700 mb-2">Drag & drop your inspiration photos here</p>
                      <p className="text-pink-500 mb-4">or</p>
                    </>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition duration-300 w-full md:w-auto self-center"
                >
                  {previewUrls.length > 0 ? 'Add More Photos' : 'Browse Files'}
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFilesChange(e, false)}
                  className="hidden"
                />
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
                    
                    
                    <h5 className="font-semibold mt-3">Deposits</h5>
                    <p className="mb-2">• For services over $50, a deposit may be required to secure your booking.</p>
                    <p className="mb-2">• Deposits are non-refundable for cancellations with less than 24 hours notice.</p>
                    
                    <div className="mt-4">
                      <img src={assets.ConsentForm} alt="Consent Form" className="w-full h-auto rounded shadow-md" />
                    </div>
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