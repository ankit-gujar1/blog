const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema=mongoose.Schema({
    userName:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    role:{
        type:String,
        default:"user",
        required:false
    }
},{timestamps:true})


//sign up and login are like opposite if user is found during sign up then throw error but if user is found during login then don't throw error
// in both cases(login and sign up) we throw errors first then apply actual logics respectively

userSchema.statics.signup=async function(userName,password){
    if(!userName || !password) throw Error("Enter username and password");
    if(!validator.isStrongPassword(password)) throw Error("Password must contain that shit");

    const uName=userName.toLowerCase();

    const u=await this.findOne({uName});

    // if(u) throw Error("Username already exist");

    // const salt=await bcrypt.genSalt(10);
    // const hash=await bcrypt.hash(password,salt);

    // const user= await this.create({userName:uName,password:hash});

    // return user;

    if(!u){
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(password,salt);

        const user= await this.create({userName:uName,password:hash});

        return user;
    }
    else throw Error("Username already exist");
}

userSchema.statics.login=async function(userName,password){
    if(!userName || !password) throw Error("Enter username and password");

    const uName=userName.toLowerCase();

    const u=await this.findOne({userName:uName});

    // if(!u) throw Error("User not exist or inccorect username");

    // const match=await bcrypt.compare(password,u.password);

    // if(!match) throw Error("Incorrect password");
    
    // return u;

    if(u){
        const match = await bcrypt.compare(password, u.password);

        if (!match) throw Error("Incorrect password");

        return u;
    }
    else throw Error("User not exist or inccorect username");
}

module.exports=mongoose.model('User',userSchema);