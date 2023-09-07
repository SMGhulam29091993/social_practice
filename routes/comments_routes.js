const express = require('express');
const router = express.Router();



const commentController = require('../controllers/comments_controller');



router.post('/commentCreate', commentController.commentCreate);


module.exports = router;