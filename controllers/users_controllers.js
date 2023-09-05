const User = require('../models/users');

module.exports.profile = function(req,res){
    return res.render('users_profile',{
        title : "User's Profile"
    });
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