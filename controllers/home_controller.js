const Post = require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/users');

// module.exports.home = function(req,res){
//     console.log(req.cookies);
//     res.cookie('user_id',25);
//     Post.find({})
//     .populate('user')
//     .populate({
//         path : 'comment', populate : {path : 'user'}
//     })
//     .exec()
//     .then((post)=>{
//         User.find({})
//         .then((user)=>{
//             return res.render("home",{
//                 title : "Social | Home",
//                 posts : post,
//                 all_users : user
//         })
        
//         });
//     })
// }

module.exports.home = async function(req, res){

    try{
        // CHANGE :: populate the likes of each post and comment
        let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            },
            // populate : {
            //     path : 'likes'
            // },
        }).populate('likes')
        

    
        let user = await User.find({});

        return res.render('home', {
            title: "Social | Home",
            posts:  post,
            all_users: user
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}



