import express from  'express'
import { verifyUsers } from './verifyUser.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/',verifyUsers)

      
      

//     bearerToken(req, function(err, token) {        
        //     res.send({
        //         token:token,
        //         email:email,
        //         password:password
        //     })
        //     // if(token){
        //     //     res.send({
        //     //         message:"Loged"
        
        //     //     })            
        //     // }else{
        //     //     res.send({
        //     //         message:"Invalid credential"
        //     //     })
        //     // }
        //   })
        

export const loginRouter = router    