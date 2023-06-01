import { Task } from "../model/taskSchema.js";

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