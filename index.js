import express, { json } from  'express'
import dotenv from "dotenv"
import { loginRouter } from './routers/login.js';
import { registerRouter } from './routers/register.js';
import { taskRouter } from './routers/task.js';
import { createConnection } from './createConnection.js';
import { reSendOtpRouter } from './routers/resendOtp.js';
import { verifyRouter } from './routers/verifyOtp.js';

const PORT = process.env
dotenv.config()
const app = express();
app.use(express.json())

// export const client = await createConnection();                //db connected

createConnection()




app.use('/register',registerRouter)
app.use('/login',loginRouter)
app.use('/verifyOtp',verifyRouter)
app.use('/reSendOtp',reSendOtpRouter)

app.use('/task',taskRouter)




app.listen(PORT,()=>{
    console.log("App is started")
})

    