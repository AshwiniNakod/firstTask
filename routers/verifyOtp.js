import express from 'express'
import { Otp } from '../model/otpSchema.js';
import { verify } from 'jsonwebtoken';
import { verifyOtp } from '../controller/verifyOTP.js';
const router = express.Router()


router.post('/',verifyOtp)

export const verifyRouter = router


// api /sendotp/

  
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

