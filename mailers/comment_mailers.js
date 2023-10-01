const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    let htmlString = nodeMailer.renderTemplate({comment : comment},'/comments/new_comments.ejs');
   
    nodeMailer.transporter.sendMail({
        from : 'Social.com',
        to : comment.user.email,
        subject : 'New Comment Published',
        html : htmlString
    }, (err, info)=>{
        if(err){
            console.log(`Error in sending Email ${err}`);
            return;
        }
        console.log(`Message Sent ${info.response}`);
        return;
    })
}