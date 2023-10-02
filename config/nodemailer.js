
const nodemailer = require('nodemailer');

const ejs = require('ejs');
const path = require('path');

let testAccount = nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dagmar56@ethereal.email',
        pass: '9DjmmewYuDRpt3jh3h'
    }
}); 
let renderTemplate = (data, relativePath) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(
            path.join(__dirname, '../views/mailers', relativePath),
            data,
            function (err, template) {
                if (err) {
                    console.log(`Error in rendering Template ${err}`);
                    reject(err);
                } else {
                    resolve(template);
                }
            }
        );
    });
};


module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}
