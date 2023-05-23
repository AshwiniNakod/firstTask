import mongoose, { Schema } from 'mongoose';


const userSchema  = new mongoose.Schema({
    verify:{
        type:Boolean,
        default:true
    },
    email :String,
    password: String,
},{timestamps:true})

export const User = new mongoose.model("User",userSchema)      //collection creation
