import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContent } from '../context/AuthContext'

const VerifyEmail = () => {
  const inputRef = React.useRef([])
  const navigate = useNavigate()
  axios.defaults.withCredentials=true

  const{BACKEND_URL}=useContext(AuthContent)


    const handleInput =(e, index)=>{
        if(e.target.value.length>0 && index<inputRef.current.length-1){
            inputRef.current[index+1].focus()
        }
     
    }

    const handleBackspace= (e,index)=>{

       if(e.key==="Backspace" && e.target.value===""&& index>0){

        inputRef.current[index-1].focus()
       }
    }

    const handleSubmit= async (e) => {
      e.preventDefault();
      const otpArray = inputRef.current.map(e=>e.value)
       const otp= otpArray.join("")
       
     
      try {
        const {data} = await axios.post(BACKEND_URL + "/api/auth/verifyEmail", {otp})
      
        if(data.success){ 
          toast(data.message)
         navigate("/home")}
         else{
          {
            toast.error(data.message)
          }
         }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Network error occurred.";
    
           toast.error(errorMessage);
      }
      
      

    }
          

  return (

    <div  className='flex  justify-center items-center bg-gradient-to-r from-lime-50 to-blue-400  min-h-screen '>


       <div className='bg-slate-900 sm:min-w-96  p-4 rounded-md  flex-row  flex justify-center items-center '>
        <form  onSubmit={handleSubmit}>
            

           <h1 className='text-center font-bold text-white text-2xl py-3'><strong>Verify Email</strong></h1>
            <p className='text-white text-center p-2'>Enter  6 digit verification code </p>

            
            <div className='flex gap-2 justify-center p-2  mb-5'>
                {

                Array(6).fill(0).map((_, index)=>(
                    <input type="text"  className='w-10 h-10 bg-slate-600 rounded-md text-white text-center ' maxLength={1}  ref={e=>inputRef.current[index]=e} onInput={e=>handleInput(e,index) } onKeyDown={e=>handleBackspace(e,index)} key={index} />
                ))

                
                } 
            </div>   
                
      
            <button className='bg-gradient-to-r from-indigo-500 to-indigo-900 w-full py-2 rounded-full mb-4'>continue</button>
        </form>
         </div>
         </div>
      
  
  )
}

export default VerifyEmail
