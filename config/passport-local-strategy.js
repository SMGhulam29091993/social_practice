const passport = require('pasport');
const LocalStrategy = require('passport.local').Strategy;

const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField : 'email'
    }, 
    function(email,password,done){
        // find a user and establish the identity
        User.findOne({email : email})
        .catch(err=>{
            console.log("Error in finding the user ==> Passport");
            return done(err);
        })
        .then(user=>{
            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null, false);
            }
            return done(null, user);
        })
    }
))