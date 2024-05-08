const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    body: {
        required: true,
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    image: {
        type: String, // Just store the path to the uploaded file
        required: true
    },
    postedBy: {
        required: true,
        type: 'ObjectId',
        ref: 'User'
    }
},{timestamps:true})

module.exports=mongoose.model('Blog',blogSchema);