import React from 'react'
import {Mail,Lock} from "lucide-react"
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContent } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from "react-router-dom"
const ResetPassword = () => {
       const [isEmailSent, setIsEmailSent]=useState(false)
       const [isOtpInputSent,setIsOtpInputSent]=useState(false)
       const [email,setEmail]=useState("")
       const [newPassword, setNewPassword]=useState("")
       const[repeatNewPassword,setRepeatNewPassword]=useState("")
       const [otp,setOtp] = useState("")
       const[loading,setLoading]=useState(false)
       const navigate=useNavigate()
       
        

          const inputRef = React.useRef([])
          
          
          
          const handleInput =(e, index)=>{
            if(e.target.value.length>0 && index<inputRef.current.length-1){
                inputRef.current[index+1].focus()
            }}
             const handleBackspace= (e,index)=>{

           if(e.key==="Backspace" && e.target.value==="" && index>0){

             inputRef.current[index-1].focus()
                }
              }
            
           
          
          
            const handleEmail = async (e)=>{
                try {
                    e.preventDefault()
                    setLoading(true)
                     axios.defaults.withCredentials=true
                     const {data}= await axios.post( "/api/auth/sendResetOtp", {email})
                     if(data.success){
                     setIsEmailSent(true)
                     toast(data.message)  
                }
                else{
                    toast.error(data.message)
                }
            
                } catch (error) {
                      toast.error(error.response?.data?.message || error.message);
                }
                 finally{
                    setLoading(false)
                }
            }
               
                


            const handleSubmit= async (e)=>{
                try{
                    
                     e.preventDefault()
                      setLoading(true)
                     if(newPassword !== repeatNewPassword) toast.error("password not matched")
                     axios.defaults.withCredentials=true
                    const {data} = await axios.post("/api/auth/resetPassword", {otp,email,newPassword})
                     if(data.success){
                        navigate("/")
                       toast(data.message)    
                       }
                else{
                    toast.error(data.message)
                }

                  } catch (error) {
                      toast.error(error.response?.data?.message || error.message);
                  }
                   finally{
                    setLoading(false)
                }
            }
            const handleResetOtp= async (e)=>{
                 e.preventDefault()
                 const finalOtp = inputRef.current.filter(Boolean).map(e => e.value).join("");
                try{
                    const {data} = await axios.post("/api/auth/verifyOtp", {email})
                    if(data.success){
                         setOtp(finalOtp); 
                         setIsOtpInputSent(true)
                         toast(data.message)
                    }
                    else{
                        toast.error(data.message)
                    }
                        
                  } catch (error) {
                      toast.error(error.response?.data?.message || error.message);
                  }
            
             }
            
               
            

  return (


    <div  className='flex items-center bg-gradient-to-r from-lime-50 to-blue-400 justify-center min-h-screen  flex-col'>
        
          <div className='absolute top-3 left-6 '>
         <h1 className='  font-bold text-blue-400 '>MERN-AUTHENTICATION</h1>
         </div>
         
          {/* email modal*/}
      {
        !isEmailSent &&  <div className='bg-slate-900 sm:min-w-96 p-4 text-white flex flex-row justify-center items-center rounded-md'>
            <form onClick={handleEmail} >
                <h1 className=' text-center text-2xl font-bold p-3'>Reset Password</h1>
                <p className='text-md py-2 mb-3 text-center'>Enter your email  </p>

                <div className='bg-slate-800  rounded-full  p-2 px-5 flex justify-between items-center mb-6 '>
                    <div className='px-1'>{<Mail/>}</div>
                   <input type="email" className='bg-transparent   text-white  outline-none   ' placeholder='Enter email' required value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
              
                    <button type='submit' disabled={loading} className='bg-gradient-to-r from-indigo-500 to-indigo-900 w-full py-2 rounded-full mb-2 '>continue</button>
               
            </form>
         </div>
      }
        

        {/*reset password modal*/}
      {
        (isEmailSent && !isOtpInputSent) &&  <div className='bg-slate-900 sm:min-w-96  p-2 rounded-md  flex justify-center items-center '>
        <form onSubmit={handleResetOtp} >
            

           <h1 className='text-center font-bold text-white text-2xl py-3'><strong>Enter Reset Password Otp</strong></h1>
            <p className='text-white text-center py-2'>Enter the 6 digit Reset password Otp code </p>

            
            <div className='flex gap-2 justify-center py-2  mb-5'>
                {

                Array(6).fill(0).map((_, index)=>(
                    <input type="text"  className='w-10 h-10 bg-slate-600 rounded-md text-white text-center ' maxLength={1}  ref={e=>inputRef.current[index]=e} onInput={e=>handleInput(e,index)} onKeyDown={e=>handleBackspace(e,index)} key={index} />
                ))

                
                }
               
                
            </div>   
                
           <div className='flex justify-center items-center p-3'>
            <button type='submit' disabled={loading} className=' py-2 px-5 text-white font-bold bg-gradient-to-r from-indigo-500  to-indigo-900 rounded-full w-full mb-2 '>continue</button>
            
           </div>
             
        </form>
         </div>
      
      } 

        
       
           {/*new password modal*/}
            { (isEmailSent && isOtpInputSent) && <div className='bg-slate-900 sm:min-w-96 p-4 text-white flex flex-row justify-center items-center rounded-md'>
            <form onSubmit={handleSubmit} >
                <h1 className=' text-center text-2xl font-bold p-3'>Enter New Password</h1>
                <p className='text-md p-2 mb-3 text-center'>Enter a new password </p>

                <div className='bg-slate-800 w-full rounded-full p-2 flex justify-between items-center mb-6 '>
                    <div className='px-2'>{<Lock/>}</div>
                   <input type="password" className='bg-transparent text-white w-full outline-none ' placeholder='Enter new password' required value={newPassword} onChange={e=>setNewPassword(e.target.value)}/>
                </div>
              
                <div className='bg-slate-800 w-full rounded-full p-2 flex justify-between items-center mb-6 '>
                    <div className='px-2'>{<Lock/>}</div>
                   <input type="password" className='bg-transparent text-white w-full outline-none ' placeholder='repeat  password' required value={repeatNewPassword} onChange={e=>setRepeatNewPassword(e.target.value)}/>
                </div>
              
                    <button type='submit' disabled={loading} className='bg-gradient-to-r from-indigo-500 to-indigo-900 w-full py-2 rounded-full mb-2 '>continue</button>
               
            </form>
         </div>
            }











         </div> 
    
  )
}

export default ResetPassword
