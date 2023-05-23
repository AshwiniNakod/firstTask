import { Otp } from "../model/otpSchema.js";

export const verifyOtp = async(req,res)=>{
    try {
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
   
    } catch (error) {
        console.log(error)
    }
    // res.send(user);
}
