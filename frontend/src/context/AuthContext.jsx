import axios from 'axios'
import React, {  createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
export const AuthContent=createContext()

const AuthContext = (props) => {

   const [isLoggedIn , setIsLoggedIn]=useState(false)
   const [userData, setUserData]=useState(null)

    axios.defaults.withCredentials=true
     
     const getIsAuthenticated = async () => {
    try {
        await axios.get("/api/auth/isAuth")
        setIsLoggedIn(true)
        getUserData();
    } catch (error) {
        console.log("isAuth failed:", error.response?.status, error.response?.data)
    }
}

        const getUserData= async () =>{
          try {
            const {data} = await axios.get( "/api/user/userData")
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
