import React, { useContext,  useState } from 'react'
import {toast} from "react-toastify"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {Mail,Lock,User} from "lucide-react"
import { AuthContent } from '../context/AuthContext.jsx'





const SignUp = () => {

    const[state, setState]=useState("login")
    const[name, setName]=useState("")
    const[email, setEmail]=useState("")
    const[password, setPassword]=useState("")
    const [loading, setLoading] = useState(false)
     const navigate =useNavigate()

     const {BACKEND_URL,setIsLoggedIn} = useContext(AuthContent)
    

    const handleSubmit= async (e) =>{
      e.preventDefault();
      axios.defaults.withCredentials=true
      if(email.length<2 ||password.length<2) return toast.error("enter all fields");
     
     if(state==="login"){ 
          setLoading(true)
      try {
        const {data} =  await axios.post(BACKEND_URL+"/api/auth/login", {
          email,
          password
         })
        if(data.success){
         setIsLoggedIn(true);
         toast(data.message);
         navigate("/home");
        }
        else{
          toast.error("login failed");
        }
      } catch (error) {
       toast.error(error.response?.data?.message || error.message);
        console.log(error.response?.data); // temporary, so you can see full detail in console
      }
      finally{
          setLoading(false)
        }
        
      
      }
      else{
           setLoading(true)
       
        try {
           const {data} = await axios.post(BACKEND_URL+"/api/auth/signUp", {name,email,password})
           if(data.success){
            setIsLoggedIn(true);
            toast(data.message);
            navigate("/home");
           }else{
                 toast.error(data.message)
           }
        
          
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
            console.log(error.response?.data); // temporary, so you can see full detail in console
        }
        finally{
          setLoading(false)
        }
        

      }
    }

  return (
    <div className='flex items-center bg-gradient-to-r from-lime-50 to-blue-400 justify-center min-h-screen ' >
      <div className='absolute top-3 left-6 '>
         <h1 className='  font-bold text-blue-400 '>MERN-AUTHENTICATION</h1>
      </div>
        {
            state==="login" ?<div key="login" className='p-10 m-2 w-full bg-slate-900 rounded-lg shadow-lg sm:w-96 text-indigo-300 text-sm'>
       <p className='text-center text-white text-2xl p-2 mb-2'>{state}</p>
    
     <form onSubmit={handleSubmit} >
        
        <div  className='flex items-center justify-center rounded-full bg-slate-800 mb-6 p-2' >

              <div ><Mail/></div>
            <input  className='px-4 w-full bg-transparent text-base rounded-md outline-none  ' value={email}   onChange={(e)=>setEmail(e.target.value)} type="email" id='email' placeholder='Enter Email'  />
        </div>
        <div  className='flex items-center justify-center  rounded-full bg-slate-800 mb-6 p-2' >
               <div ><Lock/></div>
            <input className='px-4 w-full bg-transparent text-base  rounded-md outline-none  ' value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password' placeholder='Enter password' />
        </div>
        <div className='mb-2 '>
        <button  className='px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full w-full'>{state}</button>
     </div>
     </form>

     <p className='my-2.5' ><span onClick={()=>navigate("/resetPassword")} className='underline cursor-pointer '>forgot password?</span></p>
       
     <div className='flex justify-center gap-2'>
        <p>dont have  an account?</p>
       
       <p className='text-white'><span onClick={()=>setState("signUp")} className='text-blue-600 cursor-pointer underline'>signUp</span></p>
     </div>
    

     
   </div>


   :<div key="signUp" className='p-10 m-2 w-full bg-slate-900 rounded-lg shadow-lg sm:w-96 text-indigo-300 text-sm'>
       <p className='text-center text-white text-2xl p-2 mb-2'>{state}</p>
    
     <form onSubmit={handleSubmit}>
        <div className='flex rounded-full bg-slate-800 mb-6 p-2'>
                <div><User/></div>
            <input  className='px-4 w-full bg-transparent text-base  rounded-md outline-none  ' type="text" id='name' placeholder='Enter name' value={name}  onChange={e=>setName(e.target.value)} />
        </div>
        <div className='flex rounded-full bg-slate-800 mb-6 p-2'>
                <div><Mail/></div>
            <input  className='px-4 w-full bg-transparent text-base  rounded-md outline-none '  type="email" id='email' placeholder='Enter email' value={email}  onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className='flex rounded-full bg-slate-800 mb-6 p-2' >
                <div><Lock/></div>
            <input  className='px-4 w-full bg-transparent text-base  rounded-md outline-none '  type="password" id='password' placeholder='Enter password' value={password}  onChange={e=>setPassword(e.target.value)} />
        </div >
        <div className='mb-2'>
        <button className='px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full w-full'>{state}</button>
     </div>
     </form>
     
     <div className='flex justify-center gap-2'>
        <p>Already have an account?</p>
        <p className='text-white'><span onClick={()=>setState("login")} className='text-blue-600 cursor-pointer underline'>login</span></p>
     </div>
     
   </div>
        }
     
     
   </div>
  )
}

export default SignUp
