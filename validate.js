const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken')
const valildateToken=async (req,res,next)=>{
    const obj = await jwt.verify(req.headers.authorization.split(" ")[1],"simplilearn",(err,payload)=>{
        if(err)
        {
            res.send({status:401,result:"token expired"});
        }
        else{
            if(payload.email==req.body.email)
                next();
            else{
                res.send({status:401,result:"unauthorized user"});
            }
        }
    })
}
module.exports=valildateToken;