import express from "express"
import {allUsers,deleteUser,updateUser, UserById, userData} from "../controllers/userController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const userRouter = express.Router()
userRouter.get('/userData',verifyToken,userData)
userRouter.get("/userById/:id", UserById)
userRouter.get("/allUsers", allUsers)
userRouter.delete("/delete/:id", deleteUser)
userRouter.put("/update", updateUser)

export default userRouter;