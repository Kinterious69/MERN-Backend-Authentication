import express from "express"
import {  login, logout, signUp,  } from "../controllers/authController.js";
import { isAuthenticated, resetPassword, sendResetPasswordOtp, sendVerificationOTp, verifyEmail, verifyToken , veryfyOtp } from "../middleware/authMiddleware.js";
const authRouter=express.Router()

authRouter.post("/signUp", signUp )
authRouter.post("/login", login )
authRouter.post("/logout", logout)
authRouter.post("/sendVerifyOtp", verifyToken,sendVerificationOTp)
authRouter.post("/verifyEmail", verifyToken,verifyEmail)
authRouter.post("/verifyOtp" ,veryfyOtp)
authRouter.get("/isAuth", verifyToken,isAuthenticated)
authRouter.post("/sendResetOtp", sendResetPasswordOtp)
authRouter.post("/resetPassword", resetPassword)



export default authRouter;