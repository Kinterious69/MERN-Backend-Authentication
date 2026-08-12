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
    
    
      <div className=' min-h-screen p-2  flex gap-4 flex-col  items-center  '>
      
        <div>
         
         <div className='  mt-12 p-12 w-72 '  >
        <img className='   rounded-full p-1 bg-slate-900  '  src={images} alt="" />
         </div>
         <div> 
         {userData && <p className='text-center text-lg  text-white   font-bold '>welcome back, { userData.name.split(" ")[0]} <br></br> </p>}
        </div>
        </div>


       
       
          <div className=' p-1  bg-slate-900  rounded-md flex flex-col gap-2   mb-5    '>
        <h1 className='text-center text-lg   text-white'><strong>Profile</strong></h1>
       
            <div className='flex gap-2'>
                 <div className='text-white px-2 '>
                  Name:
                 </div>
                 <div className='text-white px-2 '>
                   {userData ? userData.name : ""}
                 </div>
            </div>
          
          
            <div className='flex gap-3 '>
                 <div className='text-white px-2 '>
                  Email:
                 </div>
                 <div className='text-white px-2 '>
                   {userData ? userData.email : ""}
                 </div>
            </div>
          
          
            <div className='flex gap-2 mb-2 ' >
                 <div className='text-white px-2 '>
                  Status:
                 </div>
                 <div className='text-white px-2 '>
                   {userData && userData.verified ?<div className='w-18 text-green-600 font-bold bg-white rounded-md px-3'>Verified</div> :(  !userData.verified?<div className='w-18 text-red-600 font-bold bg-white rounded-md px-3'>unVerified</div> : "")}  
                 </div>
            </div>
          
          

            



       
            
        </div>
         
        
        
    
     
     </div>
     
     


      
   

    
  )
}

export default Hero
