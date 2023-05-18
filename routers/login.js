import express from  'express'
import { verifyUsers } from './verifyUser.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/',verifyUsers)

      
      


export const loginRouter = router    