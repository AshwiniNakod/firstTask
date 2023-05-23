import express from 'express'
import { reSendOtp } from '../controller/reSendOtp.js'


const router = express.Router()

router.post('/',reSendOtp)

export const reSendOtpRouter = router

