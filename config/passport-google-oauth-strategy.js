const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');


// tell passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID : '573020397191-o28stv14kh0thv7mj1jjvm1dcqmt9s8a.apps.googleusercontent.com',
        clientSecret : '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',
        callbackURL : 'http://localhost:8000/users/auth/google/callback'
    },(accessToken,refreshToken,profile,done)=>{
        // find a user
        User.findOne({email : profile.emails[0].value}).exec()
        .catch(err=>{
            console.log(`Error in passport-google-oauth ${err}`);
            return;
        })
        .then(user=>{
            // if user not found then create the user and set it as req.user
            if(!user){
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                })
                .catch(err=>{
                    console.log(`Error in creating user ${err}`);
                    return;
                })
                .then(user=>{
                    return done(null, user);
                })
            }else{
                // if user found then set the user as req.user
                return done(null, user);
            }
        })
    }
))