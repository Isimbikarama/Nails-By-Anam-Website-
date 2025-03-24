import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Add this import

import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import NailSalonMenu from './pages/NailSalonMenu';
import Pressons from './pages/Pressons';
import AboutPage from './pages/AboutPage';
import Booking from './pages/Booking';
import LookBook from './pages/LookBook';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Services" element={<NailSalonMenu />} />
        <Route path="/Pressons" element={<Pressons />} />
        <Route path="/about" element={<AboutPage />} /> 
        <Route path="/Booking" element ={<Booking/>}/>
        <Route path="/LookBook" element ={<LookBook/>} />
        
      </Routes>
    </div>
  );
};

export default App;
