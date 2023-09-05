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


// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in then pass on the request to the next function(controllers action)
    if (req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        // the req.user contains the signed-in users  from the session cookies and sending them to locals
        // for the views  
        res.local.user  =req.user;
    }
};

module.exports = passport;
