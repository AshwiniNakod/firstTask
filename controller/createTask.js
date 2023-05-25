import jwt from "jsonwebtoken";
import { Task } from "../model/taskSchema.js";

export const createTask = async(req,res) =>{
        try {
                const {taskName,taskStatus} = req.body
                const task =  new Task({taskName,taskStatus}) 
                await task.save()
                res.send(task)
         
        } catch (error) {
                response.status(500).send(error);       
        }
               
}