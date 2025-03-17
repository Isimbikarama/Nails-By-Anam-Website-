import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='border border-gray-400 bg-transparent flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-2 justify-center items-center'>
        {/* left side */}
        <div className='md:w-1/2 order-1 md:order-1 flex justify-center'>
            <img className='w-3/4 md:w-1/2 h-auto rounded-lg' src={assets.Character_Logo} alt="" />
        </div>
        {/* right side */}
        <div className='md:w-1/2 flex flex-col items-center justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] order-2 md:order-2 text-center bg-transparent'>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-vw-20 md:text-vw-25 glow text-white font-semibold leading-tight md:leading-tight lg:leading-tight' style={{ fontFamily: 'BebasNeue-Regular' }}> 
                    Nails by Anam <br /> 
                </p>
                <div className='flex flex-col md:flex-row items-center justify-center gap-3 text-sm font-light'>
                    <img className='w-24 md:w-28' src={assets.group_profiles} alt="" />
                    <p className='text-center text-vw-3 md:text-vw-5 font-PTSerif-Regular'>
                        Simply browse through our extensive list of trusted doctors, schedule an appointment now!
                    </p>
                </div>
                <a className='flex items-center justify-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href="#speciality">
                    Book Appointment 
                </a>
            </div>
        </div>
    </div>
  )
}

export default Header;
