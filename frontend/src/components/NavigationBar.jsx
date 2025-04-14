import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const NavigationBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [token, setToken] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className='flex flex-col items-center justify-center text-lg py-2 mt-15 mb-10 relative' style={{ fontFamily: 'PTSerif-Regular' }}>
        
      {/* Hamburger menu for mobile - moved to left side */}
      <div className='md:hidden w-full flex justify-start px-4'>
        <button 
          onClick={toggleMenu} 
          className='text-primary focus:outline-none z-50'
          aria-label="Toggle menu"
        >
          {showMenu ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu - fullscreen left-aligned */}
      {showMenu && (
        <div className='md:hidden fixed inset-0 bg-pink-200 z-40 flex flex-col justify-center'>
          <ul className='flex flex-col items-start gap-6 w-full px-8'>
            <NavLink to="/" onClick={toggleMenu} className="w-full">
              <li className='py-2 text-xl font-medium border-b border-gray-100'>Home</li>
            </NavLink>
            <div className="w-full">
              <li className='py-2 text-xl font-medium border-b border-gray-100'>
                <NavLink to="/services" onClick={toggleMenu}>Services</NavLink>
                
              </li>
            </div>
            <NavLink to="/pressons" onClick={toggleMenu} className="w-full">
              <li className='py-2 text-xl font-medium border-b border-gray-100'>Press-Ons</li>
            </NavLink>
            <NavLink to="/booking" onClick={toggleMenu} className="w-full">
              <li className='py-2 text-xl font-medium border-b border-gray-100'>Booking</li>
            </NavLink>
            <NavLink to="/lookbook" onClick={toggleMenu} className="w-full">
              <li className='py-2 text-xl font-medium border-b border-gray-100'>Lookbook</li>
            </NavLink>
            <div className="w-full">
              <li className='py-2 text-xl font-medium border-b border-gray-100'>
                <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
                <NavLink to="/Events" onClick={toggleMenu} className="pl-4 text-lg text-gray-600">
                  - Events
                </NavLink>
              </li>
            </div>
            <NavLink to="/contact" onClick={toggleMenu} className="w-full">
              <li className='py-2 text-xl font-medium border-b border-gray-100'>Contact</li>
            </NavLink>
          </ul>
        </div>
      )}
      
      {/* Desktop menu - always visible on md and up */}
      <ul className='hidden md:flex items-center gap-5'>
        <NavLink to="/"><li className='py-1 px-3'>Home</li></NavLink>
        
        <div className="relative group">
          <NavLink to="/services">
            <li className='py-1 px-3'>Services</li>
          </NavLink>
          <div className="absolute opacity-0 group-hover:opacity-100 hover:opacity-100  w-40 z-50 transition-opacity duration-150 ease-in-out"
               >
            <div className="pt-2">
             
            </div>
          </div>
        </div>

        <NavLink to="/pressons"><li className='py-1 px-3'>Press-Ons</li></NavLink>
        <NavLink to="/CuticleOil"><li className='py-1 px-3'>Cuticle Oil</li></NavLink>
        <NavLink to="/booking"><li className='py-1 px-3'>Booking</li></NavLink>
        <NavLink to="/lookbook"><li className='py-1 px-3'>Lookbook</li></NavLink>
        
        <div className="relative group">
          <NavLink to="/about">
            <li className='py-1 px-3'>About</li>
          </NavLink>
          <div className="absolute opacity-0 group-hover:opacity-100 hover:opacity-100  w-40 z-50 transition-opacity duration-150 ease-in-out"
               >
            <div className="pt-2">
              <NavLink to="/Events">
                <li className='py-2 px-4 transition-colors duration-150'>Events</li>
              </NavLink>
            </div>
          </div>
        </div>
        
        <NavLink to="/contact"><li className='py-1 px-3'>Contact</li></NavLink>
      </ul>
    </div>
  )
}

export default NavigationBar