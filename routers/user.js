import express from  'express'
import { verifyUser } from '../controller/verifyUser.js';
import { verifyOtp } from '../controller/verifyOTP.js';
import { reSendOtp } from '../controller/reSendOtp.js';
import { sendEmail } from '../controller/sendMail.js';


const router = express.Router();



router.post('/register',sendEmail)
router.post('/login',verifyUser)
router.post('/verifyOtp',verifyOtp)
router.post('/reSendOtp',reSendOtp)


export const userRouter = router    