import jwt from 'jsonwebtoken'


 export const tokenGenerator =  (userId,res)=>{
    const payload={userId}

   const token =   jwt.sign(payload,  process.env.SECRET_KEY,
       {expiresIn:"7d"}
    )
    res.cookie("token", token, {
      httpOnly: true,
       secure: false,        // only sent over HTTPS
      sameSite: 'lax',    // required for cross-site requests
    })

}