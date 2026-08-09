import jwt from 'jsonwebtoken'


 export const tokenGenerator =  (userId,res)=>{
    const payload={userId}

   const token =   jwt.sign(payload,  process.env.SECRET_KEY,
       {expiresIn:"7d"}
    )
    res.cookie("token", token, {
      httpOnly: true,
       secure: true,     
      sameSite: 'none',    
      maxAge: 7 * 24 * 60 * 60 * 1000 
    })

}