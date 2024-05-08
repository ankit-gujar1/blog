const express = require('express');
const router=express.Router();

const upload = require('../multer');

const requireUserAuth=require('../middlewares/requireUserAuth');

const { getAllBlogs, getAllBlogsByUserId, getPopularBlogs, postBlog, deleteBlog, updateBlog, likeBlog, dislikeBlog }=require('../controllers/blogController');

router.get('/all-blogs',requireUserAuth,getAllBlogs);
router.get('/my-blogs',requireUserAuth,getAllBlogsByUserId);
router.get('/popular-blogs',requireUserAuth,getPopularBlogs);
router.post('/post-blog',upload.single('image'),requireUserAuth,postBlog);
router.put('/like-blog/:id',requireUserAuth,likeBlog);
router.put('/dislike-blog/:id',requireUserAuth,dislikeBlog);
router.delete('/delete-blog/:id',requireUserAuth,deleteBlog);
router.patch('/edit-blog/:id',upload.single('image'),requireUserAuth,updateBlog);

module.exports=router;
