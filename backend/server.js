/*import express from 'express'
import 'dotenv/config'
import { connectDB } from './src/config/db.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import userRouter from './src/routes/userRoute.js'
import authRouter from './src/routes/authRoute.js'



const app =express()
const PORT=process.env.PORT || 4000
app.use(express.json())
const frontEndApi =["https://mern-backend-authentication.vercel.app"]
app.use(cors({credentials:true,origin:frontEndApi}))
app.use(cookieParser())


app.use("/api/auth",authRouter )
app.use("/api/user", userRouter)


connectDB()

app.get("/", (__, res)=>{
    res.send("hi sulayman")
})

app.listen(PORT, ()=>console.log(`server running on port ${PORT} `))*/
import express from "express"  
import 'dotenv/config'      // Make sure express is imported
import cors from "cors"
import cookieParser from "cookie-parser" // Import cookie-parser
import userRouter from './src/routes/userRoute.js'
import authRouter from './src/routes/authRoute.js'
import { connectDB } from './src/config/db.js'


const app = express()
// Force pass all preflight checks right at entrypoint


const PORT = process.env.PORT || 4000

// 1. FIXED: Removed the trailing slash "/" from the URL string
const frontEndApi = ["https://mern-backend-authentication-1xxkad4v2-sulayman-kintehs-projects.vercel.app"]

// 2. CORS Middleware (Must stay at the top)
app.use(cors({
  origin: frontEndApi,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// 3. Request Parsers (Must be initialized BEFORE your routes)
app.use(express.json())
app.use(cookieParser()) 

// 4. Your Routes
app.use('/api/user', userRouter) // Assuming this is your user route
app.use('/api/auth', authRouter)


connectDB()

app.get("/", (__, res)=>{
    res.send("hi sulayman")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
