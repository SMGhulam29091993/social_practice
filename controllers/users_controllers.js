const User = require('../models/users');
const Post = require('../models/post');

module.exports.profile = function (req, res) {
    // Find user posts and populate related data
    Post.find({})
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        })
        .exec()
        .then((post) => {
            // Find the user by ID and render the profile page
            User.findById(req.params.id)
                .then((user) => {
                    if (!user) {
                        console.log("User not found.");
                        return res.redirect('back');
                    }
                    return res.render('users_profile', {
                        title: `${user.name} Profile`,
                        posts: post,
                        profile_user: user
                    });
                })
                .catch((err) => {
                    console.error('Error finding user:', err);
                    return res.redirect('back');
                });
        })
        .catch((err) => {
            console.error('Error finding posts:', err);
            return res.redirect('back');
        });
};

module.exports.update = (req,res)=>{
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.user.id, req.body)
        .then(user=>{
            return res.redirect('back');
        })
        .catch(err=>{
            console.log("Error in updating the user : ",err);
            return;
        })
    }else{
        return res.status(401).send('Unauthorised');
    }
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

