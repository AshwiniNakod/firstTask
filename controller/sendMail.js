import bcrypt from 'bcryptjs';
import { User } from "../model/userSchema.js";
import {  sendingMail } from "./sendingMail.js";



async function genHashedPassword(password){
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)
  return hashedPassword;
}    

export async function sendEmail(req, res) {
  const { email, password } = req.body;
   const isUserInDb =  await User.findOne({email:email})
  // console.log(isUserInDb)
  if(isUserInDb){
    res.send({message:"user already exist"})
  }else{
    const hashedPassword = await genHashedPassword(password)
    // console.log(hashedPassword,password)

    const user = new User({email,password:hashedPassword})
    await user.save();
    await res.send({message:`User was registered successfully! Please check your email and OTP send to your email ${req.body.email}`})
    await sendingMail(email);
    

  
  }
 
}

// sendEmail().catch(console.error);


