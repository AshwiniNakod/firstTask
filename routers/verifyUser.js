import jwt from 'jsonwebtoken'

const verifyUser = (req,res) =>{
        let data = req.body
        let {email,password} = data
        // console.log(email,password)
        var token = jwt.sign({ email: email },process.env.SECRET_KEY,{expiresIn: '5min'});
        res.send({data,token})
        
        
}

const verify_otp = () =>{

}

export const verifyUsers = verifyUser;
