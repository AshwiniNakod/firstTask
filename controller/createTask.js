import jwt from "jsonwebtoken";

export const createTask = (req,res) =>{
        let data = req.body
        let {email,password} = data
        let token = jwt.sign({ email: email }, process.env.SECRET_KEY, {expiresIn: '5min'});
        res.send({email,token,message:"Task created"})
        
        // res.send(req.body)

}