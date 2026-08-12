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
      
        <div>
         
         <div className='  mt-12 p-12 w-72 '  >
        <img className='   rounded-full p-1 bg-slate-900  '  src={images} alt="" />
         </div>
         <div> 
         {userData && <p className='text-center text-lg  text-white   font-bold '>welcome back, { userData.name.split(" ")[0]} <br></br> </p>}
        </div>
        </div>


       
       
          <div className=' p-2  bg-slate-900  rounded-md  min-w-60 mb-5   '>
        <h1 className='text-center text-lg   text-white'><strong>Profile</strong></h1>
        
        <div className='p-2 flex flex-col gap-2    text-white  ' >
          
          
                <h1 className='font-bold' ><strong>Name:</strong>&nbsp;&nbsp;{userData && userData.name}</h1>
                <h1 className='font-bold'><strong>Email:</strong>&nbsp;&nbsp;&nbsp;{userData && userData.email}</h1>
                <h1 className='font-bold'><strong>Status:</strong>&nbsp;&nbsp;{userData && userData.verified ? "verified" : !userData? "": "unverified"}</h1>
                       
            
        </div>
         
        </div>
        
    
     
     </div>
     
     


      
   

    
  )
}

export default Hero
