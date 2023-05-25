import jwt from "jsonwebtoken";
import { Task } from "../model/taskSchema.js";


export const updateTask = (req,res) =>{
        Task.update({})
    // res.send({message:"task is updated"})
}