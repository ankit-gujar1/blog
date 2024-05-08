const express = require('express');
const router=express.Router();

const {getAllAllTask,getAllUser} = require('../controllers/adminController');
const requireAdminAuth=require('../middlewares/requireAdminAuth');


//routes for admin
router.get('/admin/test',requireAdminAuth,getAllAllTask);
router.get('/admin/users',requireAdminAuth,getAllUser);

module.exports=router;