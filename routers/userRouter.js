import express from  'express'
import { changePassword, forgetPassword, reSendOtp, resetPassword, sendEmail, verifyOtp, verifyUser } from '../controller/userController.js';


const router = express.Router();



router.post('/register',sendEmail)
router.post('/login',verifyUser)
router.post('/verifyOtp',verifyOtp)
router.post('/reSendOtp',reSendOtp)
router.post('/changePassword',changePassword)
router.post('/forgetPassword',forgetPassword)
router.get('/resetPassword',resetPassword)




export const userRouter = router    