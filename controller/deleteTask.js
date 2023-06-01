import jwt from "jsonwebtoken";
import { Task } from "../model/taskSchema.js";

export const deleteTask = async(req,res) =>{
    try {
        const id=req.params.id
        const task = await Task.deleteOne({_id:id});
        console.log(req.params.id)
        if(!task){
            res.status(404).send("No task found")
        }else{
            res.status(200).send(task)
        }

    } catch (error) {
        // res.status(500).send(error)
        return res.status(500).send({message:error.message})

    }
    
    
}