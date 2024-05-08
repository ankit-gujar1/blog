const { default: mongoose } = require('mongoose');
const Test=require('../models/testModel');

const getAll=async(req,res)=>{
    const user_id=req.user._id;
    try{
        const t=await Test.find({user_id}).sort({createdAt: -1});
        res.status(200).json(t);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

const post=async(req,res)=>{
    const user_id=req.user._id;
    const user_name=req.user.userName;
    const {name}=req.body;
    try{
        const t=await Test.create({name,user_id,user_name});
        res.status(200).json(t);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

module.exports={getAll,post};