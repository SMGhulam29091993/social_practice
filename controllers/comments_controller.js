const Comment = require('../models/comments');
const Post = require('../models/post');

// module.exports.commentCreate = (req, res) => {
//   Post.findById(req.body.post)
//     .then(post => {
//       if (!post) {
//         console.log("Post not found");
//         return res.status(404).json({ error: 'Post not found' });
//       }

//       Comment.create({
//         content: req.body.content,
//         post: req.body.post,
//         user: req.user._id // Assuming you have user authentication in place
//       })
//         .then(comment => {
//           post.comments.push(comment);
//           return post.save();
//         })
//         .then(() => {
//           res.redirect('/');
//         })
//         .catch(err => {
//           console.error("Error:", err);
//           return res.status(500).json({ error: 'Internal server error' });
//         });
//     })
//     .catch(err => {
//       console.error("Error:", err);
//       return res.status(500).json({ error: 'Internal server error' });
//     });
// };

module.exports.commentCreate = (req,res)=>{
    Post.findById(req.body.post)
    .catch(err=>{
        console.log(`Error in finding the error : ${err}`);
        return;
    })
    .then(post=>{
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            })
            .catch(err=>{
                console.log(`Error in finding the error : ${err}`);
                return;
            })
            .then(comment=>{
                post.comment.push(comment);
                post.save();
            })
            .then(()=>{
                res.redirect('/');
            })
        }
        
    })
}