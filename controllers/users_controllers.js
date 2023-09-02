module.exports.profile = function(req,res){
    return res.render('users',{
        title : "User's Profile"
    });
}