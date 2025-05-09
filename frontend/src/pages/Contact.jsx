import React from 'react'
import Footer from '../components/Footer'
import Contactform from '../components/Contactform'

const Contact = () => {
  return (
    <div className='fade-in'>
      <h1 className="text-7xl glow text-white my-6 text-center p-2" style={{fontFamily:'bebasNeue-Regular'}}>Contact</h1>
      <Contactform />
      <Footer/>
    </div>
    
  )
}

export default Contact