import express, { json } from  'express'
import dotenv from "dotenv"
import { taskRouter } from './routers/taskRouter.js';
import { createConnection } from './createConnection.js';
import { userRouter } from './routers/userRouter.js';

const PORT = process.env
dotenv.config()
const app = express();
app.use(express.json())

createConnection()

app.use('/user',userRouter);
app.use('/task',taskRouter)


app.listen(PORT,()=>{
    console.log("App is started")
})

    