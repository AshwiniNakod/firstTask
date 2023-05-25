import jwt from "jsonwebtoken";
import { Task } from "../model/taskSchema.js";

export const getAllTask = async(req,res) =>{
    try {
        let result=await Task.find({})
        res.send(result)        
    } catch (error) {
        response.status(500).send(error);

    }

}