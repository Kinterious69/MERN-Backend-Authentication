import mongoose from "mongoose";

const User = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    verificationOtp:{type:String, default:""},
    verificationOtpExpiresAt :{type:Date , default:0},
    resetOtp:{type:String, default:""},
    resetOtpExpiresAt:{type:Date, default:0},
    isVerified:{type:Boolean,default:false}
},{
    timestamps:true
})

export const userModel = mongoose.model("User", User)