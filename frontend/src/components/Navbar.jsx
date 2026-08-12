import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import axios from "axios"
import { AuthContent } from '../context/AuthContext.jsx'
import { useEffect } from 'react'





const Navbar = () => {
  
    const navigate =useNavigate()
  
    const {setIsLoggedIn,setUserData,userData, getUserData} = useContext(AuthContent)
    const[logoutloading, setlogoutLoading]=useState(false)
    const [verifyEmailLoading, setVerifyEmailLoading]=useState(false)
 
   
   
   axios.defaults.withCredentials=true
   useEffect(()=>{
      getUserData()
   },
       [])
  
   const handleClick= async (e) =>{
      try {  
              e.preventDefault()
             setlogoutLoading(true)
            const {data} = await axios.post("/api/auth/logout")
            if(data.success){
              
               setIsLoggedIn(false);
               setUserData(false); 
               toast(data.message);
               navigate("/")
            }
            else{
             toast.error(error.message)
            }
          
      } catch (error) {
         toast.error(error.message)
      }finally{
         setlogoutLoading(false)
      }
   }
   const handleVerifyOtp = async (e)=>{
      try {
         e.preventDefault()
         setVerifyEmailLoading(true)
         const {data}= await axios.post( "/api/auth/sendVerifyOtp");
         if(data.success){
            toast(data.message)
            navigate("/verifyEmail")
            
         }
         
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
         
      }
      finally{
         setVerifyEmailLoading(false)
      }
   }
   
  return (
    <div className='flex justify-between items-center shadow-lg p-2 top-0 absolute w-full text-white  '>
        
       <h1 className=' text-white text-xs font-bold '>MERN-AUTHENTICATION</h1>
       {
        
       <div className='group '>
                  {
                     userData ?(
                      <><button  className=' py-1.5 px-3.5  text-md relative shadow-lg font-bold bg-slate-900 rounded-full ' >{userData && userData.name[0].toUpperCase()}</button>
                      <ul className='group-hover:block   hidden bg-transparent cursor-pointer absolute right-0 mr-3 p-1 text-sm'>
                      { 
                       
                       !verifyEmailLoading ?  <li onClick={handleVerifyOtp} className='hover:bg-white text-xs hover:text-black mb-1'>verifyEmail</li> : <li>Loading...</li>

                      }
                      {
                      !logoutloading  ? <li onClick={handleClick} className='hover:bg-white text-xs hover:text-black'>Logout</li> : <li>Loading...</li>
                      }
                       </ul>
                        </>
                     ):
                     (
                        <button onClick={()=>navigate("/")} className=' text-center  text-xs relative shadow-lg font-bold bg-slate-900 px-3.5 py-1.5 rounded-full tracking-wider' >login</button>
                     )
                  }    

                      </div>
          
         
           }
    </div>
      
   
  )

}
export default Navbar
