import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import NailSalonMenu from './pages/NailSalonMenu';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Services" element={<NailSalonMenu />} />
      </Routes>
    </div>
  );
};

export default App;
