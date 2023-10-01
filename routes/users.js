const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersController = require("../controllers/users_controllers");


// router for usersController
router.get("/profile/:id", passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in',usersController.signIn );

router.post('/create', usersController.create);

router.post('/create-sessions', passport.authenticate(
    'local',
    {
    failureRedirect : '/users/sign-in'
    }
), usersController.createSession);

router.get('/sign-out', usersController.endSession);

router.get('/auth/google', passport.authenticate('google', {scope : ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google', 
    {
        failureRedirect: '/users/sign-in'
    }), usersController.createSession);

module.exports = router;