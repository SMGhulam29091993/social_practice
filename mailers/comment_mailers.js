const nodeMailer = require('../config/nodemailer');


exports.newComment = async (comment) => {
    try {
        const htmlString = await nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comments.ejs');

        const info = await nodeMailer.transporter.sendMail({
            from: '"Social.com" <dagmar56@ethereal.email>',
            to: comment.user.email, // Assuming comment.user.email is a valid email address
            subject: 'New Comment Published',
            html: htmlString
        });

        console.log(`Message Sent ${info.response}`);
    } catch (err) {
        console.log(`Error in sending Email ${err}`);
    }
};
