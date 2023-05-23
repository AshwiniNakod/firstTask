import mongoose, { Schema } from 'mongoose';

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    
},{timestamps:true})

otpSchema.index({createdAt:1},{expireAfterSeconds:300})

export const Otp = new mongoose.model("Otp",otpSchema)
