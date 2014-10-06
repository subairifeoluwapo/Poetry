'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Poem = mongoose.model('Poem'),
    // errorHandler = require('./errors'),
    // Comment = mongoose.model('Comment'),
    _ = require('lodash');
var poems = require('../../app/controllers/poems');

/**
 * Create a Comment
 */
exports.createComment = function(req, res) {
	var poem = req.poem;
	var comment = req.body;
	comment.user = req.user;
	poem.comments.unshift(comment);

	poem.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: 'comment could not load'
			});
		} else {
			res.jsonp(poem);
		}
	});
};

// /**
//  * List Comments
//  */
// exports.listComments = function(req, res) {
// 	Comment.find().sort('-created').populate('user', 'displayName').exec(function(err, comments) {
// 		if (err) {
// 			return res.status(400).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(comments);
// 		}
// 	});
// };

/**
 * Delete a Comment
 */
exports.deleteComment = function(req, res) {
	var poem = req.poem;
	poem.comments.id(req.params.commentId).remove();
	poem.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: 'could not delete comment'
			});
		} else {
			res.jsonp(poem);
		}
	});
};


/**
 * Comment middleware
 */
exports.commentByID = function(req, res, next, id) {
		req.comment = req.poem.comment.id(id);
		next();
};


/**
 * Comment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.comment.currentUser._id.toString() !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};