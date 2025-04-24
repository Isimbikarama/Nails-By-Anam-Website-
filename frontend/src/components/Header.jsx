import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate();

  const handleGoToBooking = () => {
    window.scrollTo(0, 0);
    navigate('/Booking');
  }

  return (
    <div className='bg-transparent flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-2 justify-center items-center hide-scrollbar px-[5%] '>
      {/* left side */}
      <div className='md:w-1/2 scale-125 order-1 md:order-1 flex justify-center lg:-translate-x-[-10%] '>
        <img className='w-3/4 md:w-3/7 h-auto rounded-lg lg:-translate-x-[-10%]' src={assets.Character_Logo} alt="" />
      </div>
      {/* right side */}
      <div className=' md:w-1/2 flex flex-col items-center justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] order-2 md:order-2 text-center bg-transparent lg:-translate-x-[15%]'>
        <div className='flex flex-col items-center justify-center w-full space-y-6'>
          <p className='text-7xl text-center sm:text-vw-25 glow text-white font-semibold leading-tight' style={{ fontFamily: 'BebasNeue-Regular' }}> 
            Nails by Anam
          </p>
          <div className='flex flex-col md:flex-row items-center justify-center w-full max-w-md mx-auto mt-[-5%]'>
            <p className='text-center  text-xl' style={{fontFamily:'PTSerif-Regular'}}>
            Luxury manicures & custom press-ons in Waterloo & Markham. Flawless nails, anytime!
            </p>
          </div>
          <button onClick={handleGoToBooking} className='text-xl flex items-center justify-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300 max-w-md mx-auto' style={{fontFamily:'PTSerif-Regular'}}>
      Book Appointment
          </button>
         
        </div>
      </div>
    </div>
  )
}

export default Header;