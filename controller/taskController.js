import { Task } from "../model/taskSchema.js";
import { query } from "express";



//create task
export const createTask = async(req,res) =>{
        try {
                const {taskName,taskStatus} = req.body
                const task =  new Task({taskName,taskStatus}) 
                await task.save()
                res.status(201).send({task})
         
        } catch (error) {
                return res.status(500).send({message:error.message})
        }
               
}

//getAllTask
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


//detele task
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


 //update Task
 export const updateTask = async(req,res) =>{
    try {
     const id=req.params.id    
     const {taskName,taskDate,taskStatus} = req.body
     const updated_task = await Task.updateOne({_id:id},{$set:{taskName:taskName,taskDate:new Date().toString(),taskStatus:taskStatus}})
     // console.log(a)
     res.send(updated_task)
 } catch (error) {
     return res.status(500).send({message:error.message})
 }
 }


 //rearrageTask
 export const reArrangeTask = async (req, res) => {
    try {
      const id = req.params.id;
      const tasks = await Task.find({ _id: id},{taskName: 1})
      const taskNames = tasks.map((task) => task.taskName);
      // console.log(taskNames.flat())
      let a =taskNames.flat()
      const desiredSequence = [2, 0, 1]; // Index-based sequence
      
      const rearrangedArray = desiredSequence.map((index) =>a[index]);
      // console.log(rearrangedArray);
      let reArrageTask = rearrangedArray
      const updated_task = await Task.updateOne({_id:id},{$set:{taskName:reArrageTask}})
       res.send(updated_task);
    } catch (error) {
      return res.status(500).send({message:error.message})
  
    }
  };
  