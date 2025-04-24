import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import { google } from 'googleapis'; // For Google Sheets integration
import fs from 'fs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import getEmailTemplate from './emailTemplate.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'http://localhost:5002';

const app = express();
const PORT = 5002; // Change to a different port

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Configure multer to handle multiple file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

// Updated Booking Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  services: [String],
  serviceType: String, // 'nail-appointment' or 'press-ons'
  date: String,
  time: String,
  location: String,
  notes: String,
  inspirationPhotos: [String], // Updated to store an array of file paths
  sizingPhotos: [String], // Updated to store an array of file paths
  knowsMeasurements: { type: Boolean, default: null }, // Add this field
  // Press-ons specific fields
  previouslySized: { type: Boolean, default: false },
  // Nail sizes
  leftThumb: String,
  leftIndex: String,
  leftMiddle: String,
  leftRing: String,
  leftPinky: String,
  rightThumb: String,
  rightIndex: String,
  rightMiddle: String,
  rightRing: String,
  rightPinky: String,
  // Other fields
  acceptedTerms: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

const Availability = mongoose.model('Availability', new mongoose.Schema({
  date: String,
  time: String,
  isAvailable: { type: Boolean, default: true },
}));

const googleCredentials = {
  type: process.env.GOOGLE_TYPE,
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL
};

const auth = new google.auth.GoogleAuth({
  keyFile: './api-config.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

let sheets;
(async () => {
  try {
    const client = await auth.getClient();
    sheets = google.sheets({ version: 'v4', auth: client });
    console.log('Google Sheets API initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Google Sheets:', error);
  }
})();

// Map of service IDs to their names
const serviceIdToNameMap = {
  1: 'Gel-X Extensions',
  2: 'Natural Nail Manicure',
  3: 'Acrylic Extensions',
  4: 'Nail Art - Simple',
  5: 'Nail Art - Complex',
  6: 'Removal',
  7: 'Gel Polish',
  8: 'French Tips'
};

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Add working hours configuration
const workingHours = {
  1: { start: '10:00', end: '18:00' }, // Monday
  2: { start: '10:00', end: '18:00' }, // Tuesday
  3: { start: '10:00', end: '18:00' }, // Wednesday
  4: { start: '10:00', end: '18:00' }, // Thursday
  5: { start: '10:00', end: '18:00' }, // Friday
  6: { start: '10:00', end: '16:00' }, // Saturday
  0: null, // Sunday - closed
};

// Add helper function to generate time slots
const generateTimeSlots = (date, duration) => {
  const dayOfWeek = new Date(date).getDay();
  const hours = workingHours[dayOfWeek];
  
  if (!hours) return []; // Return empty array if closed
  
  const slots = [];
  const [startHour] = hours.start.split(':').map(Number);
  const [endHour] = hours.end.split(':').map(Number);
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slotTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      slots.push(slotTime);
    }
  }
  
  return slots;
};

// Helper function to add minutes to a date
function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

// Routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Nails by Anam API');
});

// Create a new booking - updated to handle multiple fields
app.post('/api/bookings', upload.fields([
  { name: 'inspirationPhoto_0', maxCount: 1 },
  { name: 'inspirationPhoto_1', maxCount: 1 },
  { name: 'inspirationPhoto_2', maxCount: 1 },
  { name: 'inspirationPhoto_3', maxCount: 1 },
  { name: 'sizingPhoto_0', maxCount: 1 },
  { name: 'sizingPhoto_1', maxCount: 1 },
  { name: 'sizingPhoto_2', maxCount: 1 },
  { name: 'sizingPhoto_3', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Incoming booking request:', req.body);
    
    // Convert service IDs to service names if needed
    let services = [];
    if (req.body.services) {
      const serviceIds = Array.isArray(req.body.services) 
        ? req.body.services 
        : [req.body.services];
        
      services = serviceIds.map(id => {
        return !isNaN(id) ? serviceIdToNameMap[id] || id : id;
      });
    } else if (req.body.serviceName) {
      services = [req.body.serviceName];
    }

    let bookingData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      services: services,
      serviceType: req.body.serviceType || 'nail-appointment',
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      notes: req.body.notes || '',
      acceptedTerms: req.body.acceptedTerms === 'true' || req.body.acceptedTerms === true,
      knowsMeasurements: req.body.knowsMeasurements === 'true',
      inspirationPhotos: [],
      sizingPhotos: []
    };

    // Process multiple file uploads
    if (req.files) {
      // Handle inspiration photos
      const inspirationPhotos = Object.entries(req.files)
        .filter(([key]) => key.startsWith('inspirationPhoto_'))
        .map(([_, file]) => `${BASE_URL}/uploads/${path.basename(file[0].path)}`);
      
      // Handle sizing photos
      const sizingPhotos = Object.entries(req.files)
        .filter(([key]) => key.startsWith('sizingPhoto_'))
        .map(([_, file]) => `${BASE_URL}/uploads/${path.basename(file[0].path)}`);

      console.log('Generated photo URLs:', { inspirationPhotos, sizingPhotos });

      if (inspirationPhotos.length > 0) {
        bookingData.inspirationPhotos = inspirationPhotos;
      }
      if (sizingPhotos.length > 0) {
        bookingData.sizingPhotos = sizingPhotos;
      }
    }

    if (req.body.serviceType === 'press-ons') {
      bookingData.previouslySized = req.body.previouslySized === 'true' || req.body.previouslySized === true;
      
      if (!bookingData.previouslySized) {
        bookingData.leftThumb = req.body.leftThumb || '';
        bookingData.leftIndex = req.body.leftIndex || '';
        bookingData.leftMiddle = req.body.leftMiddle || '';
        bookingData.leftRing = req.body.leftRing || '';
        bookingData.leftPinky = req.body.leftPinky || '';
        bookingData.rightThumb = req.body.rightThumb || '';
        bookingData.rightIndex = req.body.rightIndex || '';
        bookingData.rightMiddle = req.body.rightMiddle || '';
        bookingData.rightRing = req.body.rightRing || '';
        bookingData.rightPinky = req.body.rightPinky || '';
      }
    }

    const booking = new Booking(bookingData);
    const savedBooking = await booking.save();
    console.log('Booking saved to MongoDB:', savedBooking);

    try {
      const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
      const sheetValues = [
        savedBooking.name,
        savedBooking.email,
        savedBooking.phone,
        Array.isArray(savedBooking.services) ? savedBooking.services.join(', ') : savedBooking.services,
        savedBooking.date,
        savedBooking.time,
        savedBooking.location,
        savedBooking.serviceType,
        savedBooking.previouslySized ? 'Yes' : 'No',
        savedBooking.notes,
        // Add photo paths
        savedBooking.inspirationPhotos?.join(', ') || 'No inspiration photos',
        savedBooking.sizingPhotos?.join(', ') || 'No sizing photos',
      ];
      
      if (savedBooking.serviceType === 'press-ons' && !savedBooking.previouslySized) {
        sheetValues.push(
          savedBooking.leftThumb, 
          savedBooking.leftIndex,
          savedBooking.leftMiddle,
          savedBooking.leftRing,
          savedBooking.leftPinky,
          savedBooking.rightThumb,
          savedBooking.rightIndex,
          savedBooking.rightMiddle,
          savedBooking.rightRing,
          savedBooking.rightPinky
        );
      }
      
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Sheet1!A:Z',
        valueInputOption: 'RAW',
        requestBody: {
          values: [sheetValues]
        }
      });
      
      // Log the full data being sent to sheets
      console.log('Sheet data being sent:', sheetValues);
      console.log('Added to Google Sheets:', response.data);
    } catch (sheetError) {
      console.error('Google Sheets error:', sheetError);
    }

    try {
      console.log('Starting email send:', new Date().toISOString());
      const emailStart = Date.now();
      
      await transporter.sendMail({
        from: '"Nails by Anam" <your-email@gmail.com>',
        to: savedBooking.email,
        subject: 'Booking Confirmation - Nails by Anam',
        html: getEmailTemplate(savedBooking)
      });
      
      const emailDuration = Date.now() - emailStart;
      console.log(`Email sent successfully in ${emailDuration}ms`);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    res.status(201).json({ 
      message: 'Booking created successfully', 
      booking: savedBooking 
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      error: 'Failed to create booking: ' + error.message 
    });
  }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Update a booking
app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Booking updated successfully', updatedBooking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Delete a booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Delete all bookings
app.delete('/api/bookings', async (req, res) => {
  try {
    await Booking.deleteMany({});
    console.log('All bookings deleted successfully');
    res.status(200).json({ message: 'All bookings deleted successfully' });
  } catch (error) {
    console.error('Error deleting all bookings:', error);
    res.status(500).json({ error: 'Failed to delete bookings' });
  }
});

// Update the availability endpoint
app.get('/api/availability', async (req, res) => {
  try {
    const { date, duration } = req.query;
    
    const allSlots = generateTimeSlots(date, Number(duration));
    
    const bookings = await Booking.find({ 
      date,
      serviceType: 'nail-appointment'
    });
    
    const availableSlots = allSlots.filter(time => {
      const requestedEndTime = addMinutes(new Date(`${date} ${time}`), Number(duration));
      
      return !bookings.some(booking => {
        const bookingStart = new Date(`${date} ${booking.time}`);
        const bookingEnd = addMinutes(bookingStart, booking.duration || 60);
        
        return (
          (bookingStart <= requestedEndTime) && 
          (bookingEnd >= new Date(`${date} ${time}`))
        );
      });
    });
    
    res.json(availableSlots.map(time => ({ time })));
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

// Create a new availability slot
app.post('/api/availability', async (req, res) => {
  try {
    const { date, time } = req.body;
    const availability = new Availability({ date, time });
    await availability.save();
    res.status(201).json({ message: 'Availability slot created successfully', availability });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create availability slot' });
  }
});

// Update an availability slot
app.put('/api/availability/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAvailability = await Availability.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Availability updated successfully', updatedAvailability });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

// Delete an availability slot
app.delete('/api/availability/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Availability.findByIdAndDelete(id);
    res.status(200).json({ message: 'Availability slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete availability slot' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, comment } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.RECIPIENT_EMAIL, // Where you want to receive the emails
    subject: `New Contact Form Message from ${name}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${comment}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));