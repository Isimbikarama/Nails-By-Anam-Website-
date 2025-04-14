import React from 'react'
import HomeLocation from '../components/HomeLocation'
import Locations from '../components/Locations'
import Footer from '../components/Footer'



const AboutPage = () => {
  return (
    <div>
      <h1 className="text-7xl glow text-white my-6 text-center p-6" style={{fontFamily:'bebasNeue-Regular'}}>About</h1>
      <HomeLocation/>
      <Locations/>
      <Footer />
    </div>
  )
}

export default AboutPage