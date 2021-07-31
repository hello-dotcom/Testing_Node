const express = require('express');
const path = require('path');
const jwt= require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const cors = require('cors');

const bodyParser = require("body-parser");
const User= require('./models/user');

const app = express();
//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//mongo uri
const mongoURI = 'mongodb://localhost/simplilearn';


const validateToken = require('./validate');

const initialize= async()=>{
    db = await mongoose.connect(mongoURI,{useNewUrlParser:true, useUnifiedTopology: true})
    .then((res)=>{console.log("database connected")
                    return res;})
    .catch(err=>{console.log(err);
    process.exit(1)});
    app.listen( 5000);
}
initialize();

app.post('/register',async(req,res)=>{
  
    if(await User.findOne({email:req.body.email})!=null)
    {
        res.send({status:400,result:"this email is alreay used"});
    }
    const hash=await bcrypt.hash(req.body.password,10);
    const object = new User({
        email:req.body.email,
        password:hash,
    });
    object.save()
    .then(response=>res.send({status:200,result:"inserted"}))
    .catch(err=>res.send({status:400,result:"some thing went wrong"}));
})

app.post('/login',async(req,res)=>{
    const out= await User.findOne({email:req.body.email});
    if(out==null)
    {
        res.send({status:401,result:"id doesnot exists"});
    }
    else{
        if(await bcrypt.compare(req.body.password,out.password))
        {
            res.send({token:await jwt.sign({email:req.body.email},"simplilearn",{expiresIn:60*60}),status:200,result:"login successful"});
        }
        else{
            res.send({status:401,status:"password is incorrect"});
        }
    }

})
module.exports=app;



