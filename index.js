import express, { json } from  'express'
import dotenv from "dotenv"

import { loginRouter } from './routers/login.js';
import { registerRouter } from './routers/register.js';
import { verify_optRouter } from './routers/verifyOtp.js';
import { taskRouter } from './routers/task.js';

const PORT = process.env
dotenv.config()
const app = express();
app.use(express.json())


app.use('/register',registerRouter)
app.use('/login',loginRouter)
app.use('/task',taskRouter)




app.listen(PORT,()=>{
    console.log("App is started")
})

    