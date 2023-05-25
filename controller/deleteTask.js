import jwt from "jsonwebtoken";
import { Task } from "../model/taskSchema.js";

export const deleteTask = async(req,res) =>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        const id=req.params.id
        console.log(req.params.id)
        if(!task){
            res.status(404).send("No task found")
        }else{

            res.status(200).send("task deleted")
        }

    } catch (error) {
        res.send(error)
    }
    
    
}