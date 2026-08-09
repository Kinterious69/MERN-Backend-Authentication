import express from 'express'
import 'dotenv/config'
import { connectDB } from './src/config/db.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import userRouter from './src/routes/userRoute.js'
import authRouter from './src/routes/authRoute.js'



const app =express()
const PORT=process.env.PORT || 4000
app.use(express.json())
const frontEndApi =["http://localhost:5173","https://mern-backend-authentication.vercel.app/"]
app.use(cors({credentials:true,origin:frontEndApi}))
app.use(cookieParser())


app.use("/api/auth",authRouter )
app.use("/api/user", userRouter)


connectDB()

app.get("/", (__, res)=>{
    res.send("hi sulayman")
})

app.listen(PORT, ()=>console.log(`server running on port ${PORT} `))