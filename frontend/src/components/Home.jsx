import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'

const Home = () => {
  return (
    <div className='flex flex-col min-h-screen relative bg-gradient-to-b from-gray-50 from-70% to-orange-200'>
        <Navbar/>
        <Hero/>
      
    </div>
  )
}

export default Home
