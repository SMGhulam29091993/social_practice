const User = require('../models/users');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function (req, res) {

    // Find the user by ID and render the profile page
    try{
        let user = await User.findById(req.params.id)
    
        if (!user) {
            console.log("User not found.");
            return res.redirect('back');
        }
        return res.render('users_profile', {
            title: `${user.name} Profile`,
            profile_user: user
        });

    }catch(err){
        console.error('Error finding user:', err);
        return res.redirect('back');
    }
};

module.exports.update = async (req,res)=>{
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,(err)=>{
                if(err){
                    console.log('****Multer Error : ',err);
                }
                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    // this will delete previous img when new image is uploaded
                    if (user.avatar){
                        try{
                            fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                            console.log('Previous avatar deleted successfully.');
                        }catch(unlinkError){
                            console.error('Error in deleting the previous avatar : ',unlinkError)
                        }
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        }catch(err){
            req.flash("error", err);
            console.error(err);
            res.redirect('back');
        }

    }else{
        req.flash('error','You are unauthorise to make the update!')
        return res.status(401).send('Unauthorised');
    }
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.user.id, req.body)
    //     .then(user=>{
    //         req.flash('success','User updated!');
    //         return res.redirect('back');
    //     })
    //     .catch(err=>{
    //         console.log("Error in updating the user : ",err);
    //         req.flash('error',err)
    //         return;
    //     })
    // }else{
    //     req.flash('error','You are unauthorise to make the update!')
    //     return res.status(401).send('Unauthorised');
    // }
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
                req.flash('error',err);
                return;
        })  
        .then(user=>{
            if(!user){
                User.create(req.body)
                .then(user=>{
                    console.log(user);
                    req.flash('success', 'Congratulations! You have signd up to Social');
                    return res.redirect('/users/sign-in');
                })
                .catch(err=>{
                    console.log(`Error in finding user in signing up ${err}`);
                    req.flash('error',err);
                    return;
                })
            }else{
                req.flash('error','User already present!');
                return res.redirect('back');
            }
        })
}

// get the sign-in data and creating a session for user
module.exports.createSession = (req,res)=>{
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

// setting the sign-out controler
module.exports.endSession = (req,res)=>{
    req.logout(err=>console.error(err));
    req.flash('success', 'You have Logged Out successfully');
    return res.redirect('/')
}

