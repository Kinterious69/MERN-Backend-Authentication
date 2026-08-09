import mongoose from "mongoose";

 export const connectDB = async ()=>{
    try {
          await mongoose.connect(process.env.MONGO_URI)
         console.log("mongoDb connected" )
        
    } catch (error) {
        console.log(`failed to connect mongoDb ${error.message}`)
        process.exit(1)
    }
   

}