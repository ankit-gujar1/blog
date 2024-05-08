const { default: mongoose } = require('mongoose');
const Test=require('../models/testModel');
const User=require('../models/userModel');

const getAllAllTask=async(req,res)=>{
    try{
        const t=await Test.find({}).sort({createdAt: -1});
        res.status(200).json(t);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

const getAllUser=async(req,res)=>{
    try{
        const u=await User.find({}).sort({createdAt: -1});
        res.status(200).json(u);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

module.exports={getAllAllTask,getAllUser};