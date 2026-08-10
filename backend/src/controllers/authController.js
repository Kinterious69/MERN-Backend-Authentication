import { welcomeEmailMessage } from "../config/brevoEmail.js";
import { welcomeSignUpTemplate } from "../config/emailTemplate.js";
import { tokenGenerator } from "../config/generateToken.js";
import { transporter } from "../config/nodemailer.js";
import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt"

export const signUp= async (req,res)=>{
    const {name,email, password}=req.body;
    if(!name|| !email|| !password) return res.status(400).json({success:false, message:"enter all fields"})
    try {

        const existingUser= await userModel.findOne({email})
        if(existingUser) return res.status(400).json({success:false, message:"user already exist"})
        const hashedPassword = await bcrypt.hash(password, 10);

        const user= new userModel({
            name,
            email,
            password:hashedPassword
        })
           await user.save();
       
         const { password: userPassword, ...safeUser } = user._doc; 

          tokenGenerator(user._id,res);
        res.status(201).json({
            success:true,
            message:"user succesfully created",
            data:safeUser
        })

         
     /*
       await transporter.sendMail({
        from:process.env.SENDER,
        to:email,
        subject:"Account successfully created",
        text:"welcome to our MERN authentication app",
        html:welcomeSignUpTemplate(user)
       }).catch((err)=>console.log(err.message))*/

       await welcomeEmailMessage(email, user)
     

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

 
}

export const login= async (req,res)=>{
    const {email}=req.body;
    const {password}=req.body;

    try {

        const user= await userModel.findOne({email})
        if(!user ) return res.status(400).json({success:false, message:"user does not  exist"})
            const isMatched = await bcrypt.compare(password,user.password)
         if (!isMatched) return res.status(404).json({success:false, message:"wrong password"})

           tokenGenerator(user._id,res);

           res.status(200).json({
            success:true,
            message:"login successful",
           
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

 
}

export const logout =(__,res)=>{
    try {
         res.clearCookie("token")
           res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message,
        })
        
    }
}

const forgotPassword = async (req,res)=>{
    const {email}= req.body;
    try {
          const user = await userModel.findByIdAndUpdate({email}, red.body, {new:true});
          if(!user) return res.status(404).json({success:false, message:"no user found with this email address"})
           res.status(200).json({
           success:true,
           message:"password successfully reset"
           })
  
        
    } catch (error) {
        res.status(500).json({
           success:false,
           error:error.message
        })
    }

    
  

}