const passport  = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

const opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'social'
}

passport.use(new JWTStrategy(opts, (jwtPayLoad,done)=>{
    User.findById(jwtPayLoad._id)
    .catch(err=>{
        console.log('Error in finding the user in JWT : ',err);
    })
    .then(user=>{
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));


module.exports = passport;