import { Task } from "../model/taskSchema.js";

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

