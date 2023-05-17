import express from  'express'
import { createTask } from '../controller/createTask.js';
import { updateTask } from '../controller/updateTask.js';
import { getAllTask } from '../controller/getAllTask.js';
import { deleteTask } from '../controller/delete.js';
import { reArrangeTask } from '../controller/reArrangeTask.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/createTask',auth,createTask)
router.put('/updateTask',auth,updateTask)  
router.get('/getAllTask',auth,getAllTask)      
router.put('/reArrangeTask',auth,reArrangeTask)      
router.delete('/deleteTask',auth,deleteTask)      



      

      

export const taskRouter = router    