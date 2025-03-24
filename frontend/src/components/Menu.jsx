import React from 'react'

const Menu = () => {
  return (
    <div>
      <div className="min-h-screen p-4 flex flex-col items-center">
        
        
        <div className="bg-pink-50 rounded-lg w-full max-w-5xl p-9 shadow-md">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 flex items-center" style={{fontFamily:"BebasNeue-Regular"}}>MANICURE SERVICES <span role="img" aria-label="nail polish">💅</span></h2>
            
            <div className="flex flex-col sm:flex-row mb-2" style={{fontFamily:"PTSerif-Regular"}}>
              <img src='https://img.freepik.com/free-photo/woman-showing-her-beautiful-nails_23-2148697087.jpg?t=st=1742239069~exp=1742242669~hmac=0d7c9e38766cebba22112dd55f34b99b0a5f32f37dd24ee226c690a3720d019c&w=1800' 
                alt="Basic manicure example" 
                className="w-full sm:w-75 h-64 sm:h-full rounded-xl object-cover sm:mr-4 mb-4 sm:mb-0" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">Basic Manicure:</p>
                  <p>$20</p>
                </div>
                <p className="text-sm text-gray-600">Includes nail shaping, cuticle care, and regular polish.</p>
                
                <div className="flex justify-between mb-1 mt-2">
                  <p className="font-medium">Gel Manicure:</p>
                  <p>$35</p>
                </div>
                <p className="text-sm text-gray-600">Long-lasting gel polish with a glossy finish.</p>
                
                <div className="flex justify-between mb-1 mt-2">
                  <p className="font-medium">French Manicure:</p>
                  <p>$40</p>
                </div>
                <p className="text-sm text-gray-600">Classic French tips with gel or regular polish.</p>
                
                <div className="flex justify-between mb-1 mt-2">
                  <p className="font-medium">Luxury Spa Manicure:</p>
                  <p>$50</p>
                </div>
                <p className="text-sm text-gray-600">Exfoliation, hand massage, mask, and premium polish.</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4" style={{fontFamily:'bebasNeue-Regular'}}>ACRYLIC & GEL-X</h2>
            
            <div className="flex flex-col sm:flex-row mb-2" style={{fontFamily:"PTSerif-Regular"}}>
              <img src='https://img.freepik.com/free-photo/woman-showing-her-beautiful-nails_23-2148697087.jpg?t=st=1742239069~exp=1742242669~hmac=0d7c9e38766cebba22112dd55f34b99b0a5f32f37dd24ee226c690a3720d019c&w=1800' 
                alt="Acrylic nails example" 
                className="w-full sm:w-75 h-64 sm:h-full rounded-xl object-cover sm:mr-4 mb-4 sm:mb-0" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">Acrylic Full Set:</p>
                  <p>$55</p>
                </div>
                <p className="text-sm text-gray-600">Includes extensions with a choice of shape & acrylic polish.</p>
                
                <div className="flex justify-between mb-1 mt-2">
                  <p className="font-medium">Acrylic Fill:</p>
                  <p>$40</p>
                </div>
                <p className="text-sm text-gray-600">Refill for existing acrylic nails.</p>
                
                <div className="flex justify-between mb-1 mt-2">
                  <p className="font-medium">Gel-X Full Set:</p>
                  <p>$65</p>
                </div>
                <p className="text-sm text-gray-600">Lightweight & flexible gel nail extensions.</p>
                
                <div className="flex justify-between mb-1 mt-2">
                  <p className="font-medium">Gel-X Fill:</p>
                  <p>$55</p>
                </div>
                <p className="text-sm text-gray-600">Maintain your Gel-X nails with a seamless refill.</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4" style={{fontFamily:'bebasNeue-Regular'}}>ADD ON'S</h2>
            
            <div className="flex flex-col sm:flex-row mb-2" style={{fontFamily:"PTSerif-Regular"}}>
              <img src='https://img.freepik.com/free-photo/woman-showing-her-beautiful-nails_23-2148697087.jpg?t=st=1742239069~exp=1742242669~hmac=0d7c9e38766cebba22112dd55f34b99b0a5f32f37dd24ee226c690a3720d019c&w=1800' 
                alt="Add-on services example" 
                className="w-full sm:w-75 h-64 sm:h-full rounded-md object-cover sm:mr-4 mb-4 sm:mb-0" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">Paraffin Wax Treatment:</p>
                  <p>$10</p>
                </div>
                <p className="text-sm text-gray-600">Hand softening treatment before service.</p>
                
                <div className="flex justify-between mb-1 mt-2">
                  <p className="font-medium">Soak-off removal:</p>
                  <p>$10</p>
                </div>
                <p className="text-sm text-gray-600">For acrylic or gel nail.</p>
                
                <div className="flex justify-between mb-1 mt-2">
                  <p className="font-medium">Cuticle Oil:</p>
                  <p>$8</p>
                </div>
                <p className="text-sm text-gray-600">Lightweight & heals all nail extensions.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center my-4">
            <p className="text-lg font-medium mb-4">
              <span role="img" aria-label="heart">💕</span> Book Your Appointment Today! <span role="img" aria-label="heart">💕</span>
            </p>
            
            <button className="bg-pink-300 hover:bg-pink-400 text-black font-bold py-2 px-6 rounded-full w-32 font-cursive text-lg">
              Book!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu;