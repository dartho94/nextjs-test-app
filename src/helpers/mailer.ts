import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcrypt from "bcryptjs"

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        //Create a hased token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if(emailType === 'verify'){
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000},
                {new: true, runValidators: true});
        } else if(emailType === 'reset'){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000},
                {new: true, runValidators: true});
        } else {
            
        }
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILER_USER,
              pass: process.env.MAILER_PASS
            }
        });

        const mailOptions = {
            from: "ashis@gmail.com",
            to: email,
            subject: emailType === 'verify' ? "Verification Email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === 'verify' ? "verifyemail":"forgotpass/"+userId}?token=${hashedToken}">here</a>
             to ${emailType === "verify" ? "Verify your email" : "Reset your password"}</p>`
        };

        const mailResp = await transporter.sendMail(mailOptions);
        return mailResp;
    } catch (error: any) {
        throw new Error(error.message);
    }
}