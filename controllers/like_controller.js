const Like = require('../models/likes');
const Post = require('../models/post');
const Comment  = require('../models/comments');





module.exports.toggleLikes = async function(req,res){
    try{
        let likeable;
        let deleted = false;


        if(req.query.type === "Post"){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if a like already exist 
        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id
        })

        // if like already exist then delete it 
        if(existingLike){
            likeable.likes.pull(existingLike.id);
            await likeable.save();

            await Like.deleteOne({ _id: existingLike.id }); // Remove the like
            deleted = true;
        }else{
            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type                
            })
            likeable.likes.push(newLike._id);
            await likeable.save();
        }
        return res.status(200).json({
            message : 'Response. Successful',
            data : {
                deleted : deleted
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}