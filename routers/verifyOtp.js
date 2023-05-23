import express from 'express'
// import { otp } from '../controller/sendMail.js'
import { User } from '../model/userSchema.js';
import { Otp } from '../model/otpSchema.js';
const router = express.Router()


export const verifyOtp = async(req,res)=>{
    // res.send("verify otp")
    const { email, otp } = req.body;
    const user = await Otp.findOne({email});
    if(!user){
        res.send({message:"Invalid user or email"})
    }else{
        if(otp === user.otp){
            res.send({message:"Otp is validate successfull."})
        }else{
            res.send({message:"Enter correct Otp!"})
        }
    }
   
    // res.send(user);
}

  
// router.post('/',(req,res)=>{
//     let {OTP} = req.body;
//     console.log(otp,OTP)
//     if(otp === OTP){
//         res.send({"message":"Login successfully"})
//     }else{
//         res.send({"message" :"Invalid Login"})
//     }

// })

// export const verify_optRouter =router;
