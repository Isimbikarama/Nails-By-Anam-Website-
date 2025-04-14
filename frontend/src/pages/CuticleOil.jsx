import React from 'react'
import NailCareBenefits from '../components/NailCareBenefits'
import Footer from '../components/Footer'
import CuticleOilInfo from '../components/CuticleOilInfo' 
import IngredientsInfo from '../components/IngredientsInfo'


const CuticleOil = () => {
  return (
    <div>
        <h1 className="text-7xl glow text-white my-6 text-center p-2" style={{fontFamily:'bebasNeue-Regular'}}>Cuticle Oil</h1>
        <NailCareBenefits />
        <CuticleOilInfo/>
    <IngredientsInfo />
        <Footer/>
    </div>
  )
}

export default CuticleOil;