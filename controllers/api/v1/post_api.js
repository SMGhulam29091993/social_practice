const Post = require("../../../models/post")
const Comment = require('../../../models/comments');
const mongoose = require('mongoose');

module.exports.Index = async (req,res)=>{
    let post = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path : 'comment',
        populate : {path : 'user'}
    })
    return res.json(200,{
        message : 'List of Post',
        posts  : post
    })
}

module.exports.destroy = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid post ID.'
            });
        }
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found.'
            });
        }
        if (post.user != req.user.id){
            return res.status(401).json({
                message : 'You cannot delete this post!'
            });
        }

        await post.deleteOne({ _id: req.params.id });

        await Comment.deleteMany({ post: req.params.id });

        return res.status(200).json({
            message: 'Post and all associated comments are deleted.'
        });
    } catch (err) {
        console.log(`*******${err}`);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}