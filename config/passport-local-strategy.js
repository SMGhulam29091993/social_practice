const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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

// serialize the user to decide which key is to be kept as cookies
passport.serializeUser((user,done)=>{
    done(null, user.id);
});

// deserialize the user from the key  in the cookies
passport.deserializeUser((id,done)=>{
    User.findById(id)
    .catch(err=>{
        console.log("Error in finding the user ==> Passport");
        return done(err);
    })
    .then(user=>{
        return done(null,user)
    })
})

module.exports = passport;
