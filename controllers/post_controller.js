const Post = require('../models/post');
const Comment = require('../models/comments');
const Like = require('../models/likes');

// Create a new post
module.exports.postCreate = async function(req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
       

        if (req.xhr) {
            // Populate the user's name (exclude password) if the request is AJAX
            // post = await post.populate('user','name').execPopulate();
      
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        console.error(err);
        return res.redirect('back');
    }
};

// Delete a post
module.exports.destroy = async (req, res) => {
    try {
        console.log("Destroying post:", req.params.id);

        const post = await Post.findById(req.params.id);

        if (!post) {
            req.flash('error', 'Post not found.');
            return res.redirect('back');
        }

        if (post.user.toString() !== req.user.id) {
            req.flash('error', 'User is not authorized to delete this post.');
            return res.redirect('back');
        }

        console.log("Removing post:", post._id);
        
        // CHANGE :: delete the associated likes for the post and all its comments' likes too
        await Like.deleteMany({likeable: post, onModel: 'Post'});
        await Like.deleteMany({_id: {$in: post.comment}});

        await post.deleteOne({ _id: req.params.id });

        req.flash('success', 'Post removed successfully.');

        await Comment.deleteMany({ post: req.params.id });
        console.log("Comments associated with the post were deleted.");

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: 'Post deleted successfully'
            });
        }

        res.redirect('back');
    } catch (err) {
        req.flash("error", err);
        console.error(err);
        res.redirect('back');
    }
};






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