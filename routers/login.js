import express from  'express'
import { verifyUser} from './verifyUser.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/',verifyUser)

      
      


export const loginRouter = router    