const express = require('express');
const router=express.Router();

const uploadBlog = require('../multer');

const requireUserAuth=require('../middlewares/requireUserAuth');

const { getAllBlogs, getAllBlogsByUserId, get8PopularBlogs, getAllPopularBlogs, postBlog, deleteBlog, updateBlog, likeBlog, dislikeBlog, get8Blogs, getBlogByBlogId }=require('../controllers/blogController');

router.get('/all-blogs',requireUserAuth,getAllBlogs);
router.get('/8-blogs',requireUserAuth,get8Blogs);
router.get('/my-blogs',requireUserAuth,getAllBlogsByUserId);
router.get('/8-popular-blogs',requireUserAuth,get8PopularBlogs);
router.get('/popular-blogs',requireUserAuth,getAllPopularBlogs);
router.post('/post-blog',uploadBlog.single('image'),requireUserAuth,postBlog);
router.put('/like-blog/:id',requireUserAuth,likeBlog);
router.put('/dislike-blog/:id',requireUserAuth,dislikeBlog);
router.get('/get-blog/:id',requireUserAuth,getBlogByBlogId);
router.delete('/delete-blog/:id',requireUserAuth,deleteBlog);
router.patch('/edit-blog/:id',uploadBlog.single('image'),requireUserAuth,updateBlog);

module.exports=router;
