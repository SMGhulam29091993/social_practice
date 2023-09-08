const Post = require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/users');

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
        User.find({})
        .then((user)=>{
            return res.render("home",{
                title : "Social | Home",
                posts : post,
                all_users : user
        })
        
        });
    })
}


