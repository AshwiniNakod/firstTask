import mongoose, { Schema } from 'mongoose';


const TaskSchema = new mongoose.Schema({
    taskName:String,
    taskDate:{
                type:Date,
                default:Date.now
    },
    taskStatus:Boolean
})
export const Task = new mongoose.model("Task",TaskSchema)
