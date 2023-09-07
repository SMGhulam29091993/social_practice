const express = require('express');

const router = express.Router();
const homeController = require("../controllers/home_controller");

const passport = require('passport');


console.log("Express Router is loaded!");

// router for homeController
router.get("/", homeController.home);

// for any further routes, access from here
// router.use("${/routerName}",require(${"./routerFile"})); 
router.use("/users", require("./users"));

router.use('/post', passport.checkAuthentication, require('./post'));
router.use('/comment', passport.checkAuthentication, require('./comments_routes'));



module.exports = router;