import { Otp } from "../model/otpSchema.js";
import { User } from "../model/userSchema.js";

export const verifyOtp = async(req,res)=>{
    try {
        const { email, otp } = req.body;
    const user = await Otp.findOne({email});
    const findUser = await User.findOne({email})
    console.log(findUser)
    if(findUser.verify) {
        return res.send({message:"Already verified"})
    }
    if(!user){
        res.send({message:"Invalid user or OTP"})
    }else{
       
        if(otp === user.otp){
            await User.updateOne({email},{$set:{verify:true}})
            res.send({message:"Otp is validate successfull."})
        }else{
            res.send({message:"Enter correct Otp!"})
        }
    }
   
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
    // res.send(user);
}
