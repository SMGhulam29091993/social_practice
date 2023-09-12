const Post = require('../models/post');
const Comment = require('../models/comments');


module.exports.postCreate = async (req,res)=>{
    try{
        let post = await Post.create({
            content : req.body.content,
            user : req.user._id
        })
        req.flash('success','Post Created!');
        return res.redirect('back')
    }catch(err){
        req.flash('error',err);
        return;
    }
    // Post.create({
    //     content : req.body.content,
    //     user : req.user._id
    // })
    // .catch(err=>{
    //     console.log(`Error in creating the post : ${err}`);
    //     return;
    // })
    // .then(post=>{
    //     console.log(post);
    //     return res.redirect('back')
    // })
};


module.exports.destroy = async (req, res) => {
    try {
        console.log("Destroying post:", req.params.id); // Debugging

        const post = await Post.findById(req.params.id);

        if (!post) {
            console.error("");
            req.flash('error','Post not found.');
            return res.redirect('back');
        }

        if (post.user.toString() !== req.user.id) {
            req.flash('error','User is not authorized to delete this post.');
            return res.redirect('back');
        }

        console.log("Removing post:", post._id); // Debugging

        await post.deleteOne({_id: req.params.id});
        
        req.flash('success','Post removed successfully.');

        await Comment.deleteMany({ post: req.params.id });
        console.log("Comments associated with the post were deleted."); // Debugging

        res.redirect('back');
    } catch (err) {
        req.flash("error:", err);
        res.redirect('back');
    }
};


// module.exports.destroy = (req, res) => {
//     console.log("Destroying post:", req.params.id); // Debugging

//     Post.findById(req.params.id)
//         .then(post => {
//             if (!post) {
//                 console.error("Post not found.");
//                 return res.redirect('back');
//             }

//             if (post.user.toString() !== req.user.id) {
//                 console.error("User is not authorized to delete this post.");
//                 return res.redirect('back');
//             }

//             console.log("Removing post:", post._id); // Debugging

//             post.deleteOne({_id : req.params.id})
//                 .then(() => {
//                     console.log("Post removed successfully."); // Debugging

//                     Comment.deleteMany({ post: req.params.id })
//                         .then(() => {
//                             console.log("Comments associated with the post were deleted."); // Debugging
//                             res.redirect('back');
//                         })
//                         .catch(err => {
//                             console.error("Error deleting comments:", err);
//                             res.redirect('back');
//                         });
//                 })
//                 .catch(err => {
//                     console.error("Error deleting post:", err);
//                     res.redirect('back');
//                 });
//         })
//         .catch(err => {
//             console.error("Error finding post:", err);
//             res.redirect('back');
//         });
// };