import express from 'express'
import { Otp } from '../model/otpSchema.js';
import { verifyOtp } from '../controller/verifyOTP.js';
const router = express.Router()


router.post('/',verifyOtp)

export const verifyRouter = router



