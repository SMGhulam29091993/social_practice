const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.commentCreate = (req,res)=>{
    Post.findById(req.body.post)
    .catch(err=>{
        console.log(`Error in finding the error : ${err}`);
        return;
    })
    .then(post=>{
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            })
            .catch(err=>{
                console.log(`Error in finding the error : ${err}`);
                return;
            })
            .then(comment=>{
                post.comment.push(comment);
                post.save();
            })
            .then(()=>{
                res.redirect('/');
            })
        }else{
            console.log("Post not found");
            return res.status(404).json({ error: 'Post not found' })
        }
    })
}