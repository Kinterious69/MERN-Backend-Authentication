import express from "express"  
import 'dotenv/config'      
import cors from "cors"
import cookieParser from "cookie-parser" 
import userRouter from './src/routes/userRoute.js'
import authRouter from './src/routes/authRoute.js'
import { connectDB } from './src/config/db.js'

const app = express()
const PORT = process.env.PORT || 4000

const frontEndApi = ["http://localhost:5173","https://mern-backend-authentication.vercel.app"]

app.use(cors({
  origin: frontEndApi,
  credentials: true,
 
}))

app.use(express.json())
app.use(cookieParser()) 

app.use('/api/user', userRouter) 
app.use('/api/auth', authRouter)

connectDB()

app.get("/", (__, res)=>{
    res.send("hi sulayman")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
