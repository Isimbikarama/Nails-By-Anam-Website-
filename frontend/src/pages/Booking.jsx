import React from 'react'
import BookingForm from '../components/BookingForm'
import BookingList from '../components/BookingList'
import Footer from '../components/Footer'

const Booking = () => {
  return (
    <div className='fade-in'>
      <h1 className="text-7xl glow text-white my-6 text-center p-2" style={{fontFamily:'bebasNeue-Regular'}}>BOOKING</h1>
<BookingForm />

<Footer />
    </div>
  )
}

export default Booking