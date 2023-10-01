const Comment = require('../models/comments');
const Post = require('../models/post');
const commentMailer = require('../mailers/comment_mailers');

module.exports.commentCreate = async (req,res)=>{
    try{
        let post  = await Post.findById(req.body.post)
        if(post){
            let comment = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user.id
            })
            post.comment.push(comment);
            post.save();

            // comment = await comment.populate('user', 'name email').execPopulate();
            // commentMailer.newComment(comment);

            if(req.xhr){              
                comment = await comment.populate('user', 'name email').execPopulate();
                commentMailer.newComment(comment);
                return res.status(200).json({
                    data : {
                        comment : comment
                    },
                    message : 'Comment Created'
                })
            }

            req.flash('success','Comment added successfully!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error','Comment cannot be added');
        return;
    }
    // Post.findById(req.body.post)
    // .catch(err=>{
    //     console.log(`Error in finding the error : ${err}`);
    //     return;
    // })
    // .then(post=>{
    //     if(post){
    //         Comment.create({
    //             content : req.body.content,
    //             post : req.body.post,
    //             user : req.user._id
    //         })
    //         .catch(err=>{
    //             console.log(`Error in finding the post : ${err}`);
    //             return;
    //         })
    //         .then(comment=>{
    //             post.comment.push(comment);
    //             post.save();
    //         })
    //         .then(()=>{
    //             res.redirect('/');
    //         })
    //     }else{
    //         console.log("Post not found");
    //         return res.status(404).json({ error: 'Post not found' })
    //     }
    // })
}

module.exports.destroy = async (req, res) => {
    try{
        let comment = await Comment.findById(req.params.id)
        if (!comment) {
            console.log("Comment not found.");
            req.flash('error','Comment not found.')
            return res.redirect('back');
        }

        if (comment.user.toString() === req.user.id) {
            let postId = comment.post;
            comment.deleteOne({ _id: req.params.id })
            req.flash('success','Comment removed successfully.');
            let post = await Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } });

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        comment_id : req.params.id
                    },
                    message : 'Post deleted'
                });
            }
            return res.redirect('back');
                
                    
        } else {
            req.flash('error','Comment not found.')
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error',err)
        return res.redirect('back');
    }
    
    // Comment.findById(req.params.id)
    //     .then(comment => {
    //         if (!comment) {
    //             console.log("Comment not found.");
    //             return res.redirect('back');
    //         }

    //         if (comment.user.toString() === req.user.id) {
    //             let postId = comment.post;
    //             comment.deleteOne({ _id: req.params.id })
    //                 .then(() => {
    //                     Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } })
    //                         .then(() => {
    //                             return res.redirect('back');
    //                         })
    //                         .catch(err => {
    //                             console.error("Error updating post:", err);
    //                             return res.redirect('back');
    //                         });
    //                 })
    //                 .catch(err => {
    //                     console.error("Error deleting comment:", err);
    //                     return res.redirect('back');
    //                 });
    //         } else {
    //             return res.redirect('back');
    //         }
    //     })
    //     .catch(err => {
    //         console.error("Error finding comment:", err);
    //         return res.redirect('back');
    //     });
};
