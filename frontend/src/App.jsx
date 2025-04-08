import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import NailSalonMenu from './pages/NailSalonMenu';
import Pressons from './pages/Pressons';
import AboutPage from './pages/AboutPage';
import Booking from './pages/Booking';
import LookBook from './pages/LookBook';
import Promotions from './pages/Promotions';
import Events from './pages/Events';

const App = () => {
  return (
    <div>  
      <NavigationBar/>   
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Services" element={<NailSalonMenu />} />
        <Route path="/Pressons" element={<Pressons />} />
        <Route path="/about" element={<AboutPage />} /> 
        <Route path="/Booking" element ={<Booking/>}/>
        <Route path="/LookBook" element ={<LookBook/>} />
        <Route path ="/Promotions" element = {<Promotions/>}/>    
      <Route path = "/Events" element = {<Events/>}/>
      </Routes>
    </div>
  );
};

export default App;
