import jwt from "jsonwebtoken";


export const updateTask = (req,res) =>{
    let token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {expiresIn: '5min'});
    res.send({message:"task is updated"})
}