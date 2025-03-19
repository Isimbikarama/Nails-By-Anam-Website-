import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className='flex items-center justify-center text-lg py-2  mt-20 ' style={{ fontFamily: 'PTSerif-Regular' }}>
      
      <ul className='hidden md:flex items-center gap-5'>
        <NavLink to="/">
          <li className='py-1'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/Services">
          <li className='py-1'>Services</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
         </NavLink>
        <NavLink to="/contact">
          <li className='py-1'>Contact</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
         </NavLink>
         
      </ul>
    </div>
  )
}

export default Navbar