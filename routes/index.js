var express = require('express');
var router = express.Router();
var authenticationRoutes = require("./v1/authentication");
var postsRoutes = require("./v1/posts");


router.use('/accounts', authenticationRoutes);

router.use('/posts', postsRoutes);

module.exports = router;
