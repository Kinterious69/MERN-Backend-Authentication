import axios from 'axios'
import React, {  createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
export const AuthContent=createContext()

const AuthContext = (props) => {

   const [isLoggedIn , setIsLoggedIn]=useState(false)
   const [userData, setUserData]=useState(null)
    const  BACKEND_URL= import.meta.env.VITE_BACKEND_URL
    axios.defaults.withCredentials=true
     
     const getIsAuthenticated = async () => {
    try {
        await axios.get(BACKEND_URL + "/api/auth/isAuth")
        setIsLoggedIn(true)
        getUserData();
    } catch (error) {
        console.log("isAuth failed:", error.response?.status, error.response?.data)
    }
}

        const getUserData= async () =>{
          try {
            const {data} = await axios.get(BACKEND_URL + "/api/user/userData")
            if(data.success) {
              setUserData(data.userData) 
            }
            else{
             console.log("getUser failed:", error.response?.status, error.response?.data)
            }

            
          } catch (error) {
          
          }
        }
        
    const value={
      BACKEND_URL,
      isLoggedIn,
      setIsLoggedIn,
      userData,
      setUserData,
      getUserData,
      
    }
    
    useEffect(()=>{
      getIsAuthenticated()
    },[])
    
  return (
    <AuthContent.Provider value={value}>
      {props.children}
    </AuthContent.Provider>

   
  )
}

export default AuthContext
