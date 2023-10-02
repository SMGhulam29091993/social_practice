const queue = require('../config/kue');
const commentMailer = require('../mailers/comment_mailers');

queue.process('emails',function(job,done){
    console.log(`Worker is processing his job : ${job.data}`);

    commentMailer.newComment(job.data);

    done();
})