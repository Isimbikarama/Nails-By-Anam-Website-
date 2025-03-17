import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to="/">
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/contact">
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
         </NavLink>
      </ul>
    </div>
  )
}

export default Navbar