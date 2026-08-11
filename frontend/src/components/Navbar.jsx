import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import axios from "axios"
import { AuthContent } from '../context/AuthContext.jsx'
import { useEffect } from 'react'





const Navbar = () => {
  
   const navigate =useNavigate()
  
    const {setIsLoggedIn,setUserData,userData, getUserData} = useContext(AuthContent)
    const[loading, setLoading]=useState(false)
 
   
   
   axios.defaults.withCredentials=true
   useEffect(()=>{
      getUserData()
   },
[])
  
   const handleClick= async () =>{
      try { 
             setLoading(true)
            const {data} = await axios.post("/api/auth/logout")
            if(data.success){
               navigate("/")
               toast(data.message);
               setIsLoggedIn(false);
               setUserData(false); 
            }
            else{
             toast.error("Loging out failed")
            }
          
      } catch (error) {
         toast.error(error)
      }finally{
         setLoading(false)
      }
   }
   const handleVerifyOtp = async ()=>{
      try {
         setLoading(true)
         const {data}= await axios.post( "/api/auth/sendVerifyOtp");
         if(data.success){
            navigate("/verifyEmail")
            toast(data.message)
            
         }
         
      } catch (error) {
         toast.error(error.message)
         
      }
      finally{
         setLoading(false)
      }
   }
   
  return (
    <div className='flex justify-between shadow-lg p-3 top-0 absolute w-full text-white  '>
        
       <h1 className='mt-1 text-white text-xs font-bold '>MERN-AUTHENTICATION</h1>
       {
        
       <div className='group '>
                  {
                     userData ?(
                      <><button  className=' py-1.5 px-5  text-xs relative shadow-lg font-bold bg-transparent rounded-full ' >{userData&& userData.name[0].toUpperCase()}</button>
                      <ul className='group-hover:block   hidden bg-transparent cursor-pointer absolute right-0 mr-3 p-1 text-sm'>
                       <li onClick={handleVerifyOtp} className='hover:bg-white text-xs hover:text-black mb-1'>verifyEmail</li> 
                        <li onClick={handleClick} className='hover:bg-white text-xs hover:text-black'>Logout</li>
                      </ul>
                        </>
                     ):
                     (
                        <button onClick={()=>navigate("/")} className=' py-1.5 px-5  text-xs relative shadow-lg font-bold bg-transparent rounded-full tracking-wider' >login</button>
                     )
                  }    

                      </div>
          
         
           }
    </div>
      
   
  )

}
export default Navbar
