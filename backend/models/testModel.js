const mongoose = require('mongoose');

const testSchema=mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    user_id:{
        required:true,
        type:String
    },
    user_name:{
        required:true,
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model("Test",testSchema);