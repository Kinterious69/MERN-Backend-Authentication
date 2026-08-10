export const welcomeEmailHtml = (user) =>
   `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="margin:0;padding:40px;background:#f4f4f4;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:auto;background:#fff;padding:40px;border-radius:10px;text-align:center;">

    <h1 style="color:#2563eb;">Welcome, ${user.name}! </h1>

    <p style="font-size:16px;color:#555;line-height:1.6;">
      Your account has been successfully verified.
      We're excited to have you with us!
    </p>

    <p style="font-size:14px;color:#888;">

      Thank you for joining <strong>My App</strong>.
    </p>

  </div>
</body>
</html>
`;

export const welcomeEmailText = (user) => { return`
Welcome, ${user.name}!

Your account has been successfully verified.
We're excited to have you with us.

Thank you for joining my App!
`;
}

export const verificationOtpTemplate = (user,verificationCode)=>{
  return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #2563eb;">Verify Your Email</h2>
  
         <p>Hello,${user.name}</p>
  
         <p>Your verification code is:</p>
  
         <h1 style="
            background:#2563eb;
            color:white;
            padding:15px;
            border-radius:8px;
            text-align:center;
            letter-spacing:5px;">
            ${verificationCode}
        </h1>
  
        <p>This code expires in <strong>10 minutes</strong>.</p>
  
        <p>If you didn't request this email, you can safely ignore it.</p>
  
        <hr>
  
        <p style="color:gray;font-size:12px;">
          © 2026 MERN-Authentication. All rights reserved.
        </p>
      </div>
    `


}

export const resetOtpTemplate=(code)=>{

  return `
             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
             <h2 style="color: #2563eb;">Reset Your Password</h2>
  
              <p>Hello,</p>
  
              <p>Your reset otp  code is:</p>
  
              <h1 style="
               background:#2563eb;
              color:white;
              padding:15px;
               border-radius:8px;
              text-align:center;
              letter-spacing:5px;">
              ${code}
              </h1>
    
             <p>This code expires in <strong>10 minutes</strong>.</p>
  
             <p>If you didn't request this email, you can safely ignore it.</p>
  
            <hr>
  
          <p style="color:gray;font-size:12px;">
          © 2026 MERN-Authentication. All rights reserved.
          </p>
        </div>
       `

}

export const resetOtptextTemplate = (code) => {
  return `

Your reset Otp code is ${code},
    Use this Otp to successfully reset your password for 
`;
}

export const welcomeSignUpTemplate= (user)=>{
  return `

       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #2563eb;">Account created</h2>
  
         <p>Hello,${user.name}</p>

         <p>welcome to my MERN-authentication app and thank you for successfully creating an account </p>
    
  
        <hr>
  
        <p style="color:gray;font-size:12px;">
          © 2026 My App. All rights reserved.
        </p>
      </div>
  
  
  `

}