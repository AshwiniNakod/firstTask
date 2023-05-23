import nodemailer from "nodemailer";
import { otpgenerator } from "./generateOtp.js";
import { Otp } from "../model/otpSchema.js";

export async function sendingMail(email) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "terrance.pollich@ethereal.email", // generated ethereal user
              pass: "bgygFPhFtjV1C5nhg8", // generated ethereal password
            },
          });
          // send mail with defined transport object
          let gen_otp=otpgenerator()
          let info = await transporter.sendMail({
            from: ' <nakodashwini@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
          //   text: `Your OTP : ${otpgenerator()}`, // plain text body
            html: `<p>Your OTP: ${gen_otp}</p>`, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      
          const otp = new Otp({otp:gen_otp,email:email})
          await otp.save();
      
        
    } catch (error) {
            console.log(error)      
    }
    
  }
  