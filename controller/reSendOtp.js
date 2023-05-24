import { User } from "../model/userSchema.js";
import { sendingMail } from "./sendingMail.js";


export const reSendOtp = async(req,res) =>{
    try {
        const { email } = req.body;
    const isUserInDb =  await User.findOne({email:email})
    if(isUserInDb){
        sendingMail(email)
        res.send({message:"otp is sent"})
   }
        // res.send("resend otp")

    } catch (error) {
            console.log(error)        
    }
}