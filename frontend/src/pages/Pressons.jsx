import React from 'react'
import Collection from '../components/Collections'
import Footer from '../components/Footer' 
import PressonMenu from '../components/PressonMenu'
import Video from '../components/Video'
import HowToOrder from '../components/HowToOrder'
import ProductInfo from '../components/ProductInfo'

const Pressons = () => {
  return (
    <div >
      <h1 className="text-7xl glow text-white my-6  text-center p-6" style={{fontFamily:'bebasNeue-Regular'}}>press-ons</h1>
        <Collection/>
        <PressonMenu/>
        <Video />
        
        <HowToOrder />
        <ProductInfo />
        <Footer/>
    </div>
  )
}

export default Pressons