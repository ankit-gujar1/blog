const { default: mongoose } = require('mongoose');
const Blog = require('../models/blogModel');

const getAllBlogs = async (req, res) => {
    try {
        const b = await Blog.find({}).populate({
            path: 'postedBy',
            select: '-password'
        }).sort({ createdAt: -1 });
        res.status(200).json(b);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const getBlogByBlogId = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "Blog not found" });
    const b = await Blog.findById(id);
    if (!b) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(b);
}

const get8Blogs = async (req, res) => {
    try {
        const b = await Blog.find({}).populate({
            path: 'postedBy',
            select: '-password'
        }).sort({ createdAt: -1 }).limit(8);
        res.status(200).json(b);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const get8PopularBlogs = async (req, res) => {
    try {
        const b = await Blog.find({}).populate({
            path: 'postedBy',
            select: '-password'
        }).sort({ likes: -1 }).limit(10);
        res.status(200).json(b);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const getAllPopularBlogs = async (req, res) => {
    try {
        const b = await Blog.find({}).populate({
            path: 'postedBy',
            select: '-password'
        }).sort({ likes: -1 });
        res.status(200).json(b);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const getAllBlogsByUserId = async (req, res) => {
    const postedBy = req.user._id;
    try {
        const b = await Blog.find({ postedBy }).populate({
            path: 'postedBy',
            select: '-password'
        }).sort({ createdAt: -1 });
        res.status(200).json(b);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const postBlog = async (req, res) => {
    const postedBy = req.user._id;
    const { title, body } = req.body;
    const image = req.file.path;

    try {
        const b = await Blog.create({ title, body, image, postedBy });
        res.status(200).json(b);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "Blog not found" });
    const b = await Blog.findOneAndDelete({ _id: id });
    if (!b) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(b);
}

const updateBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "Blog not found" });
    let updateFields = { ...req.body };
    
    if (req.file) {
        const updateimage = req.file.path;
        updateFields.image = updateimage;
    }

    const b = await Blog.findOneAndUpdate({ _id: id }, updateFields)
    if (!b) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(b);
}

const likeBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const b = await Blog.findByIdAndUpdate({ _id: id }, { $inc: { likes: 1 } }, { new: true });
        res.json(b);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const dislikeBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const b = await Blog.findByIdAndUpdate({ _id: id }, { $inc: { dislikes: 1 } }, { new: true });
        res.json(b);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

module.exports = { getAllBlogs, getAllBlogsByUserId, get8PopularBlogs, getAllPopularBlogs, postBlog, deleteBlog, updateBlog, likeBlog, dislikeBlog, get8Blogs, getBlogByBlogId };