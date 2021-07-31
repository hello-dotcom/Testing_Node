const mongoose=require('mongoose');
const script= mongoose.Schema({
    email:String,
    password:String,
});
script.index({email:1},{unique:true});
const User = mongoose.model("User",script);
module.exports=User;
