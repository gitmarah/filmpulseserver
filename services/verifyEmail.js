import nodemailer from 'nodemailer';
import jsonwebtoken from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv()
const jwt = jsonwebtoken;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.VERIFICATION_EMAIL,
        pass: process.env.VERIFICATION_PASS
    }
});



const mailOptions = (receiverEmail) => {
    const token = jwt.sign(
    {receiverEmail},
    process.env.VERIFICATION_TOKEN,
    {expiresIn: "24h"}
);
    return {
  from: `"Filmpulse" <${process.env.VERIFICATION_EMAIL}>`,
  to: receiverEmail,
  subject: "Verify Your Email",
  html: `
        <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff1fc; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div style="text-align: center;">
            <h2 style="color: #170000; text-align: center;">Welcome to filmpulse!</h2>
            <p style="color: #555555; font-size: 16px; text-align: center;">
            Thank you for signing up with us. To get started, please verify your email address by clicking the button below:
            </p>
            <div style="text-align: center; margin: 30px 0;">
            <a href="https://film-pulse.netlify.app/signin/${token}" 
                style="display: inline-block; background-color: #da0009; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                Verify My Email
            </a>
            </div>
            <p style="color: #555555; font-size: 14px; text-align: center;">
            If you didn’t sign up for filmpulse, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
            <footer style="text-align: center; color: #aaaaaa; font-size: 12px;">
            &copy; 2025 filmpulse. All rights reserved.
            </footer>
        </div>
        </div>
    `,
};

}

const verifyEmail = (receiverEmail) => {
    transporter.sendMail(mailOptions(receiverEmail), (err, info) => {
        if(err){
            console.log(err.message);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
}

export default verifyEmail;