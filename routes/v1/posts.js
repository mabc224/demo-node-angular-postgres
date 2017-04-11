/**
 * Created by Arsalan on 5/4/2017.
 */

var express = require('express');
var router = express.Router();
var postController = require("./../../controller/postController");
var postService = require("./../../service/postService");
var tokenService = require("./../../service/tokenService");

router.get('/',
	tokenService.isBearerAuthenticated,
	postController.allPost
);

router.post('/',
	tokenService.isBearerAuthenticated,
	postService.addPostValidator,
	postController.addPost
);

router.get('/:id',
	tokenService.isBearerAuthenticated,
	postService.singlePostValidator,
	postController.singlePost
);

router.delete('/:id',
	tokenService.isBearerAuthenticated,
	postService.singlePostValidator,
	postController.removeSinglePost
);

module.exports = router;

