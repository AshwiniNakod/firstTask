import jwt from "jsonwebtoken";
import { Task } from "../model/taskSchema.js";
import { query } from "express";

export const getAllTask = async(req,res) =>{
    try {
        const page=req.query.page
        let limit = (req.query.limit)
        let skip = (page-1) * limit
        // console.log(page,limit,skip)

        let result=await Task.find({}).skip(skip).limit(limit)
         res.send({result,total:result.length})        

    } catch (error) {
        res.status(500).send(error);

    }

}