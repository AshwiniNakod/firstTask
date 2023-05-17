import { otp } from '../controller/sendMail.js'

export function verifyOTP(req,res){
    let {OTP} = req.body;
    // console.log(otp,OTP)
    if(otp === OTP){
        res.send({"message":"Login successfully"})
    }else{
        res.send({"message" :"Invalid Login"})
    }

}