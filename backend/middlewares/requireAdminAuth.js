require('dotenv').config();

const jwt = require('jsonwebtoken');
const User=require('../models/userModel');

const requireAuth=async(req,res,next)=>{
    const {authorization}=req.headers;

    if(!authorization) return res.status(400).json({error:"Auth failed because authorization is not found in header"});

    const token=authorization.split(' ')[1];

    try{
        const {_id,role}=jwt.verify(token,process.env.SECRET);
        const user=await User.findOne({_id});
        
        //if we don't add role in jwt token then we can use user.role to get role and can check if role is user or admin
        //if(user.role!=="admin") return res.status(400).json({error:"Role is not admin"}); 

        if(role!=="admin") return res.status(400).json({error:"Role is not admin"});
        req.user=user._id
        next();
    }
    catch(e){
        console.log(e);
        res.status(400).json({error:"Auth failed because validation of token failed"})
    }
}

module.exports=requireAuth;