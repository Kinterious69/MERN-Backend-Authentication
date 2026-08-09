
import { userModel } from "../model/userModel.js"

export const UserById= async (req,res)=>{
    const {id} =req.params;
   
    try {

        const user= await userModel.findById(id)
        if(!user) return res.status(401).json({success:false, message:" no user with such id  exist"})
        

        res.status(200).json({
            success:true,
            message:"user succesfully found",
            data:user
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }}

export const userData = async (req,res)=>{
    const {userId} =req.user;
   
    try {

        const user= await userModel.findById(userId)
        if(!user) return res.status(401).json({success:false, message:" no user with such id  exist"})
        

        res.status(200).json({
            success:true,
            message:"user succesfully found",
            userData:{
                name:user.name,
                email:user.email,
                verified:user.isVerified
             
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

 
}
export const updateUser= async (req,res)=>{
    const id =req.params.id;


   
    try {

        const updatedUser= await userModel.findByIdAndUpdate(id, req.body, {new:true})
        if(!updatedUser) return res.status(400).json({success:false, message:" no user does to  update"})
        

        res.status(200).json({
            success:true,
            message:"user succesfully updated",
            data:updatedUser
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
        
    }



 
}

export const allUsers= async (req,res)=>{
   
   
    try {
        const users= await userModel.find()
        res.status(200).json({
            success:true,
            message:" all users successfully listed",
            data:users
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

 
}
export const deleteUser= async (req,res)=>{
    const id =req.params.id;
   
    try {

        const deletedUser= await userModel.findByIdAndDelete(id)
        if(!deletedUser) return res.status(400).json({success:false, message:" delete failed! user does not  exist"})
        

        res.status(200).json({
            success:true,
            message:"user succesfully deleted",
            data:deletedUser
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

 
}