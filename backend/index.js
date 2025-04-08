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

dotenv.config();

const app = express();
const PORT = 5002; // Change to a different port

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Replace the existing mongoose.connect line with:
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Multer Setup for Image Uploads
const upload = multer({ dest: 'uploads/' });

// Models
const Booking = mongoose.model('Booking', new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  services: [String], // Changed from single service to array of services
  date: String,
  time: String,
  location: String,
  notes: String,
  image: String
}));

const Availability = mongoose.model('Availability', new mongoose.Schema({
  date: String,
  time: String,
  isAvailable: { type: Boolean, default: true },
}));

// Replaced the Google Sheets setup section with: (for security)
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

// Updated the sheets initialization
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

// Routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Nails by Anam API');
});

// Create a new booking
app.post('/api/bookings', upload.single('image'), async (req, res) => {
  try {
    console.log('Incoming booking request:', req.body);

    // Create booking in MongoDB
    const booking = new Booking({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      services: Array.isArray(req.body.services) ? req.body.services : [req.body.serviceName],
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      notes: req.body.notes,
      image: req.file ? req.file.path : null
    });

    const savedBooking = await booking.save();
    console.log('Booking saved to MongoDB:', savedBooking);

    // Add to Google Sheets
    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Sheet1!A:H',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            savedBooking.name,
            savedBooking.email,
            savedBooking.phone,
            Array.isArray(savedBooking.services) ? savedBooking.services.join(', ') : savedBooking.services,
            savedBooking.date,
            savedBooking.time,
            savedBooking.location,
            savedBooking.notes
          ]]
        }
      });
      console.log('Added to Google Sheets:', response.data);
    } catch (sheetError) {
      console.error('Google Sheets error:', sheetError);
      // Don't fail the whole request if Google Sheets fails
    }

    // Send confirmation email with timing
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

// Add this new endpoint before the start server line
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

// Get all availability slots
app.get('/api/availability', async (req, res) => {
  try {
    const availability = await Availability.find();
    res.status(200).json(availability);
  } catch (error) {
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

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
