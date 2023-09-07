const Post = require('../models/post');

module.exports.postCreate = (req,res)=>{
    Post.create({
        content : req.body.content,
        user : req.user._id
    })
    .catch(err=>{
        console.log(`Error in creating the post : ${err}`);
        return;
    })
    .then(post=>{
        console.log(post);
        return res.redirect('back')
    })
};