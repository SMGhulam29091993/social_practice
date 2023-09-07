const User = require('../models/users');
const Post = require('../models/post');

module.exports.profile = function(req,res){
    Post.find({})
    .populate('user')
    .populate({
        path:'comment',
        populate : {
            path : 'user'
        }
    })
    .exec()
    .then(post=>{
        return res.render('users_profile',{
            title : "User's Profile",
            posts : post
        });
    })

}

// render the singn up page
module.exports.signUp =  (req,res)=>{
    if (req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('users_sign_up',{
        title : 'Social | Sign Up'
    })
}

// render the sign up page
module.exports.signIn = (req,res)=>{
    if (req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title : 'Social | Sign In'
    })
}

// get the sign-up data
module.exports.create = (req,res)=>{
        if (req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        User.findOne({email : req.body.email})
        .catch(err=>{
                console.log(`Error in finding user in signing up ${err}`);
                return;
        })  
        .then(user=>{
            if(!user){
                User.create(req.body)
                .then(user=>{
                    console.log(user);
                    return res.redirect('/users/sign-in');
                })
                .catch(err=>{
                    console.log(`Error in finding user in signing up ${err}`);
                    return;
                })
            }else{
                return res.redirect('back');
            }
        })
}

// get the sign-in data and creating a session for user
module.exports.createSession = (req,res)=>{
    return res.redirect('/');
}

// setting the sign-out controler
module.exports.endSession = (req,res)=>{
    req.logout(err=>console.error(err));
    return res.redirect('/')
}

