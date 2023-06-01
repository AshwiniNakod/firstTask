import jwt from "jsonwebtoken";
import { Task } from "../model/taskSchema.js";

export const createTask = async(req,res) =>{
        try {
                const {taskName,taskStatus} = req.body
                const task =  new Task({taskName,taskStatus}) 
                await task.save()
                // await Task.insertOne(task)
                // await Task.task.insertOne({ taskname: taskName,taskStatus:taskStatus });

                res.send(task)
         
        } catch (error) {
                return res.status(500).send({message:error.message})
        }
               
}