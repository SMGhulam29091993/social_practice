const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user_id',25);
    Post.find({})
    .populate('user')
    .populate({
        path : 'comment', populate : {path : 'user'}
    })
    .exec()
    .then((post)=>{
        return res.render("home",{
            title : "Social | Home",
            posts : post
        });
    })
    
}


