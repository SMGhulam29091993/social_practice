const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createSession = async (req,res)=>{
    try{
        let user = await User.findOne({email : req.body.email});

        if (!user || user.password != req.body.password){
            return res.status(422).json({
                message : 'Invalid username/password'
            })
        }
        return res.status(200).json({
            message : 'Successfully signed in and here is your token',
            data : {
                token : jwt.sign(user.toJSON(),'social', {expiresIn : 10000})
            }
    })
    }catch(err){
        console.log(`Error in finding the user ${err}`);
        return res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}