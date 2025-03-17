import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/NavBar'
import Homepage from './pages/Homepage'
import Contact from './pages/Contact'

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App;
