/**
 * Created by Arsalan on 5/4/2017.
 */

var express = require('express');
var router = express.Router();
var authenticationController = require("./../../controller/authenticationController");
var authenticationService = require("./../../service/authenticationService");

router.post('/login',
	authenticationService.handleSignInValidator,
	authenticationController.handleSignIn
);

router.post('/verifyLogin',
	authenticationService.handleVerifyLoginValidator,
	authenticationController.handleVerifyLogin
);

router.post('/register',
	authenticationService.handleSignUpValidator,
	authenticationController.handleSignUp
);

//router.post('/logout', authenticationController.userSignedIn, authenticationController.logOut);

module.exports = router;

