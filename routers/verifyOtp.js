import express from 'express'
import { otp } from '../controller/sendMail.js'
const router = express.Router()

router.post('/',(req,res)=>{
    let {OTP} = req.body;
    console.log(otp,OTP)
    if(otp === OTP){
        res.send({"message":"Login successfully"})
    }else{
        res.send({"message" :"Invalid Login"})
    }


})

export const verify_optRouter =router;
