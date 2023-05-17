import express from 'express'
import { sendEmail} from '../controller/sendMail.js';


const router = express.Router()

router.post('/',sendEmail)

export const registerRouter = router

