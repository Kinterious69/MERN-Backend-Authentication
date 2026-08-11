import jwt from "jsonwebtoken"
import { generateOtp } from "../config/generateOtp.js";
import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt"
import { emailVerifiedMessage, resetPasswordMessage, sendResetOtpMessage, sendVerificationCodeMessage } from "../config/brevoEmail.js";

export const  verifyToken = (req,res,next)=>{
   const {token} = req.cookies
   if(!token) return res.status(401).json({success:true, message:"not authorized"})
 
   try {
    const userId= jwt.verify(token,process.env.SECRET_KEY)
    req.user=userId;
   
    next();
    
   } catch (error) {
     res.status(401).json({
        success:false,
        message:error.message
    })
   }
}


export const isAuthenticated =  (__, res)=>{
   try {
        res.status(200).json({
         success:true,
         message:"user is authenticated"
    })
     
   } catch (error) {
         res.status(500).json({
         success:false,
         message:"user is not authenticated",
         error:error.message
    })
    
   }

}

export const sendVerificationOTp = async (req,res)=>{

    const {userId}=req.user;
   
    if(!userId) return res.status(400).json({
            success:false,
            message:"token not attached "
        })
        
    try {

        const user = await userModel.findById(userId);
        if(!user) return res.status(404).json({
            success:false,
            message:"no user available"
        })

        const verificationOtp =generateOtp()
         
       user.verificationOtp=verificationOtp;
       user.verificationOtpExpiresAt=Date.now() + 10 * 60 *1000
       await user.save();

        res.status(200).json({
            success:true,
            message:`verification code successfully sent`
        })
    

    await sendVerificationCodeMessage(user.email,user,verificationOtp)
          
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }


}
export const verifyEmail = async (req,res)=>{
    const{userId}=req.user;
    const{otp}=req.body
  
    try {
       const user =await userModel.findById(userId);
       
         if(user.isVerified ) {return res.status(400).json({
            success:false,
             message:"account is already verified"
         })}
         if(user.verificationOtp !== otp || user.verificationOtp==="") {return res.status(400).json({
            success:false,
             message:"wrong verification token"
         })}
          if(user.verificationOtpExpiresAt<Date.now()) return res.status(401).json({success:false, message:"verification otp code has expired"})
    
         user.verificationOtp=""
         user.verificationOtpExpiresAt=0
         user.isVerified=true;
    
        await user.save();

      res.status(200).json({
        success:true,
        message:`email successfully verified`

      })
    
        await emailVerifiedMessage(user.email, user)
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }


}

export const sendResetPasswordOtp = async (req,res)=>{
        const {email}= req.body;
        try {

          const user = await userModel.findOne({email})
          if(!user) return res.status(404).json({success:false, message:" user not found"})
            

          const resetOtp=generateOtp()

          user.resetOtp=resetOtp;
          user.resetOtpExpiresAt=Date.now() +  10 * 60 * 1000
          await user.save()

         
          
        res.status(200).json({
        success:true,
        message:`reset otp successfully sent`

      })
 
            sendResetOtpMessage(email,resetOtp)
              
        } catch (error) {
            res.status(500).json({
               success:false,
               error:error.message
            })
        }
    
        
      

}
export const resetPassword = async (req,res)=>{
    const {otp,email,newPassword}=req.body;

   
    try {
         const user = await userModel.findOne({email});
         
         if(user.resetOtp!==otp || user.resetOtp==="" ) return res.status(404).json({message:"wrong resetOtp code"});
         if(user.resetOtpExpiresAt<Date.now()) return res.status(401).json({success:false, message:"reset otp code has expired"})
          

         const hashedPassword = await bcrypt.hash(newPassword,10)

         user.password=hashedPassword;
         user.resetOtp=""
         user.resetOtpExpiresAt=0

         await user.save();

         res.status(200).json({
            success:true,
            message:"password has been successfully reset",
            data:user
         })
   
          await resetPasswordMessage(user.email)
       

        } catch (error) {
         res.status(500).json({
            success:false,
            message:error.message
         })
    }
   


}