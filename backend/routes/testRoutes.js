const express = require('express');
const router=express.Router();

const requireUserAuth=require('../middlewares/requireUserAuth');

const {getAll,post}=require('../controllers/testController')

//routes for users
router.get('/',requireUserAuth,getAll);
router.post('/',requireUserAuth,post);

module.exports=router;