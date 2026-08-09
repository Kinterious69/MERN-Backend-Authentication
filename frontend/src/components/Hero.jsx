import React, { useContext, useState } from 'react'
import images from '../assets'
import { AuthContent } from '../context/AuthContext'


const Hero = () => {
   
  const {userData}= useContext(AuthContent)

  return (
    
    
      <div className=' min-h-screen   flex gap-4 flex-col px-6 items-center'>
      
        <div className='p-3'>
         
         <div className='mt-16'>
        <img className='p-4 sm:w-64  rounded-full bg-slate-900  '  src={images} alt="" />
         </div>
         <div> 
        <p className='text-center text-xl text-slate-900  mt-2 font-bold '>welcome back,{} <br></br> </p>
        </div>
        </div>


       
        <div className='flex justify-center items-center  '>
          <div className='sm:w-96  bg-slate-900  rounded-md  '>
        <h1 className='text-center text-lg pt-2 text-white'><strong>Profile</strong></h1>
        
        <div className='p-3 flex flex-col gap-2 text-white'>
              <h1 ><strong>Name:</strong>&nbsp;&nbsp;{userData.name}</h1>
              <h1><strong>Email:</strong>&nbsp;&nbsp;&nbsp;{userData.email}</h1>
              <h1><strong>Status:</strong>&nbsp;&nbsp;{userData.verified ? " verified " : "not verified "}</h1>

            
        </div>
         
        </div>
        </div>
    
     
     </div>
     
     


      
   

    
  )
}

export default Hero
