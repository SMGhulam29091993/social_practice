const mongoose  = require('mongoose');


const postSchema  = new mongoose.Schema({
    content : {
        type :String,
        requires : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    // include the array of ids of all the comment in this post schema itself
    comment : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
},{
    timestamps :true
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;