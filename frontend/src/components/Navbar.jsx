import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import axios from "axios"
import { AuthContent } from '../context/AuthContext.jsx'





const Navbar = () => {
  
   const navigate =useNavigate()
  
    const {BACKEND_URL,setIsLoggedIn,setUserData,userData} = useContext(AuthContent)
 
   {/*  const handleLogout= async () =>{
     
     
       const URL = "http://localhost:5000/api/logout"
      
       try {
          await axios.post(URL,{ withCredentials: true })
           localStorage.removeItem("token");
           localStorage.clear();
          toast("logout successful")
          navigate("/")
       } catch (error) {
         console.log(error)
         toast.error("logout failed")
       }
       
       }
   */}
   
   axios.defaults.withCredentials=true
  
   const handleClick= async () =>{
      try {
            const {data} = await axios.post(BACKEND_URL+"/api/auth/logout")
            if(data.success){
               
               toast(data.message);
               setIsLoggedIn(false);
               setUserData(false);
                navigate("/")
               
               
            }
            else{
             toast.error("Loging out failed")
            }
          
      } catch (error) {
         toast.error(error)
      }
   }
   const handleVerifyOtp = async ()=>{
      try {
         const {data}= await axios.post(BACKEND_URL + "/api/auth/sendVerifyOtp");
         if(data.success){
            toast(data.message),
            navigate("/verifyEmail")
         }
         
      } catch (error) {
         toast.error(error.message)
         
      }
   }
   
  return (
    <div className='flex justify-between shadow-lg p-3 top-0 absolute w-full text-white  '>
        
       <h1 className='mt-1 text-black  font-bold '>MERN-AUTHENTICATION</h1>
       {
        
       userData &&  <div className='group '>
                      <button  className=' p-2 px-4  text-sm relative shadow-lg font-bold bg-slate-700 rounded-full ' >{userData.name[0].toUpperCase()}</button>
                      <ul className='group-hover:block hidden bg-slate-900 cursor-pointer absolute right-0 mr-1 p-1 text-sm'>
                        {!userData.verified && <li onClick={handleVerifyOtp} className='hover:bg-white hover:text-black'>verifyEmail</li> }
                        <li onClick={handleClick} className='hover:bg-white hover:text-black'>Logout</li>
                      </ul>

                      </div>
          
         
           }
    </div>
      
   
  )

}
export default Navbar
