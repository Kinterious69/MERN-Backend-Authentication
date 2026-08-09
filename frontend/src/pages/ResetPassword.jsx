import React from 'react'
import {Mail,Lock} from "lucide-react"
const ResetPassword = () => {

     const inputRef = React.useRef([])
    
    
        const handleInput =(e, index)=>{
            if(e.target.value.length>0 && index<inputRef.current.length-1){
                inputRef.current[index+1].focus()
            }}
         

  return (


    <div  className='flex items-center bg-gradient-to-r from-lime-50 to-blue-400 justify-center min-h-screen  flex-col'>
        
        {/*reset password modal*/}
       

       <div className='bg-slate-900 sm:min-w-96  p-2 rounded-md  flex justify-center items-center '>
        <form >
            

           <h1 className='text-center font-bold text-white text-2xl py-3'><strong>Enter resetOtp</strong></h1>
            <p className='text-white text-center py-2'>Enter the 6 digit ResetOTP code </p>

            
            <div className='flex gap-2 justify-center py-2  mb-5'>
                {

                Array(6).fill(0).map((_, index)=>(
                    <input type="text"  className='w-10 h-10 bg-slate-600 rounded-md text-white text-center ' maxLength={1}  ref={e=>inputRef.current[index]=e} onInput={e=>handleInput(e,index)} key={index} />
                ))

                
                }
               
                
            </div>   
                
           <div className='flex justify-center items-center p-3'>
            <button className=' py-2 px-5 text-white font-bold bg-gradient-to-r from-indigo-500  to-indigo-900 rounded-full w-full '>continue</button>
            
           </div>
             
        </form>
         </div>
      
         {/* email modal*/}

         <div className='bg-slate-900 sm:min-w-96 p-4 text-white flex flex-row justify-center items-center rounded-md'>
            <form >
                <h1 className=' text-center text-2xl font-bold p-3'>Enter Email</h1>
                <p className='text-md py-2 mb-3 text-center'>Enter your email  </p>

                <div className='bg-slate-800 w-full rounded-full p-2 flex justify-between items-center mb-6 '>
                    <div className='px-2'>{<Mail/>}</div>
                   <input type="email" className='bg-transparent text-white w-full outline-none ' placeholder='Enter email' required />
                </div>
              
                    <button className='bg-gradient-to-r from-indigo-500 to-indigo-900 w-full py-2 rounded-full mb-4'>continue</button>
               
                 

            
    

            </form>
         </div>
           {/*new password modal*/}
         <div className='bg-slate-900 sm:min-w-96 p-4 text-white flex flex-row justify-center items-center rounded-md'>
            <form >
                <h1 className=' text-center text-2xl font-bold p-3'>Enter New Password</h1>
                <p className='text-md p-2 mb-3 text-center'>Enter a new password </p>

                <div className='bg-slate-800 w-full rounded-full p-2 flex justify-between items-center mb-6 '>
                    <div className='px-2'>{<Lock/>}</div>
                   <input type="email" className='bg-transparent text-white w-full outline-none ' placeholder='Enter email' required />
                </div>
              
                    <button className='bg-gradient-to-r from-indigo-500 to-indigo-900 w-full py-2 rounded-full mb-4'>continue</button>
               
                 

            
    

            </form>
         </div>











         </div> 
    
  )
}

export default ResetPassword
