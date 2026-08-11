import React, { useContext, useState } from 'react'
import images from '../assets'
import { AuthContent } from '../context/AuthContext'
import { useEffect } from 'react'


const Hero = () => {
   
  const {userData,getUserData}= useContext(AuthContent)

  useEffect(()=>{
      getUserData();
    },[])
     

  return (
    
    
      <div className=' min-h-screen p-2  flex gap-4 flex-col px-6 items-center overflow-hidden'>
      
        <div className='mt-4  '>
         
         <div className='  p-16 sm:w-96 '  >
        <img className='   rounded-full p-1 bg-slate-900  '  src={images} alt="" />
         </div>
         <div> 
        <p className='text-center text-lg  text-white  mt-2 font-bold '>welcome back, {userData && userData.name.split(" ")[0]} <br></br> </p>
        </div>
        </div>


       
       
          <div className=' p-2  bg-slate-900  rounded-md  mw-60 mb-5   '>
        <h1 className='text-center text-lg   text-white'><strong>Profile</strong></h1>
        
        <div className='p-2 flex flex-col gap-2  mb-2  text-white  ' >
          
          
                <h1 className='font-bold' ><strong>Name:</strong>&nbsp;&nbsp;{userData && userData.name}</h1>
                <h1 className='font-bold'><strong>Email:</strong>&nbsp;&nbsp;&nbsp;{userData && userData.email}</h1>
                <h1 className='font-bold'><strong>Status:</strong>&nbsp;&nbsp;{userData && userData.verified ? "verified" : "unverified"}</h1>
                       
            
        </div>
         
        </div>
        
    
     
     </div>
     
     


      
   

    
  )
}

export default Hero
