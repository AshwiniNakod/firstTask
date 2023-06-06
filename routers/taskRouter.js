import express from  'express'
import { auth } from '../middleware/auth.js';
import { createTask, deleteTask, getAllTask, reArrangeTask, updateTask } from '../controller/taskController.js';

const router = express.Router();

router.post('/createTask',auth,createTask)
router.put('/updateTask/:id',auth,updateTask)  
router.get('/getAllTask',auth,getAllTask)      
router.put('/reArrangeTask/:id',auth,reArrangeTask)      
router.delete('/deleteTask/:id',auth,deleteTask)      



      
export const taskRouter = router    