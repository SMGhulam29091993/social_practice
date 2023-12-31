const express = require('express');
const router = express.Router();


const postController = require('../controllers/post_controller');


router.post('/postCreate', postController.postCreate);
router.get('/destroy/:id', postController.destroy);

module.exports = router;