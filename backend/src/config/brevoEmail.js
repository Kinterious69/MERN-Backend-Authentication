import { BrevoClient } from '@getbrevo/brevo';
import { welcomeSignUpTemplate,welcomeEmailHtml,verificationOtpTemplate,resetOtpTemplate } from './emailTemplate.js';


// Initialize the modern Brevo client
const brevo = new BrevoClient({ 
  apiKey: process.env.BREVO_API_KEY
});

// Reusable function to send to any email address
export async function sendVerificationCodeMessage(userEmail,user, verificationCode) {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: 'Your Verification Code',
      htmlContent: verificationOtpTemplate(user,verificationCode),
      
      // Make sure this email is verified in your Brevo account dashboard
      sender: { 
        name: 'sulayman918', 
        email: 'sulaymankinteh918@gmail.com' 
      },
      
      // Targets the dynamic recipient passed into the function
      to: [{ 
        email: userEmail 
      }],
    });

    console.log('Email sent successfully. Message ID:', result.messageId);
    return true;
  } catch (error) {
    console.error('Brevo API Error:', error);
    throw error;
  }
}
export async function sendResetOtpMessage(userEmail, resetOtp) {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: 'Your Reset Otp Code',
      htmlContent: resetOtpTemplate(resetOtp),
      
      // Make sure this email is verified in your Brevo account dashboard
      sender: { 
        name: 'sulayman918', 
        email: 'sulaymankinteh918@gmail.com' 
      },
      
      // Targets the dynamic recipient passed into the function
      to: [{ 
        email: userEmail 
      }],
    });

    console.log('Email sent successfully. Message ID:', result.messageId);
    return true;
  } catch (error) {
    console.error('Brevo API Error:', error);
    throw error;
  }
}
export async function resetPasswordMessage(userEmail) {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: "password successfully reset",
      htmlContent: `<html><body><p>your password had been successfully reset</p></body></html>`,
      
      // Make sure this email is verified in your Brevo account dashboard
      sender: { 
        name: 'sulayman918', 
        email: 'sulaymankinteh918@gmail.com' 
      },
      
      // Targets the dynamic recipient passed into the function
      to: [{ 
        email: userEmail 
      }],
    });

    console.log('Email sent successfully. Message ID:', result.messageId);
    return true;
  } catch (error) {
    console.error('Brevo API Error:', error);
    throw error;
  }
}
export async function emailVerifiedMessage(userEmail, user) {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: 'Email successfully  Verified ',
      htmlContent: welcomeEmailHtml(user),
      
      // Make sure this email is verified in your Brevo account dashboard
      sender: { 
        name: 'sulayman918', 
        email: 'sulaymankinteh918@gmail.com' 
      },
      
      // Targets the dynamic recipient passed into the function
      to: [{ 
        email: userEmail 
      }],
    });

    console.log('Email sent successfully. Message ID:', result.messageId);
    return true;
  } catch (error) {
    console.error('Brevo API Error:', error);
    throw error;
  }
}
export async function welcomeEmailMessage(userEmail, user) {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: "Account successfully created",
      htmlContent: welcomeSignUpTemplate(user),
      
      // Make sure this email is verified in your Brevo account dashboard
      sender: { 
        name: 'sulayman918', 
        email: 'sulaymankinteh918@gmail.com' 
      },
      
      // Targets the dynamic recipient passed into the function
      to: [{ 
        email: userEmail 
      }],
    });

    console.log('Email sent successfully. Message ID:', result.messageId);
    return true;
  } catch (error) {
    console.error('Brevo API Error:', error);
    throw error;
  }
}
