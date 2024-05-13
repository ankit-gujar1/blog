const express = require('express');
const router=express.Router();

const uploadDp = require('../multer');

const {loginUser,signupUser}=require('../controllers/userController');

router.post('/signup',uploadDp.single('dp'),signupUser);

router.post('/login',loginUser)

module.exports=router;