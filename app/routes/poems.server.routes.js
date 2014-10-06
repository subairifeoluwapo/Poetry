'use strict';

/**
 * Module dependencies.
 */

var users = require('../../app/controllers/users'),
	poems = require('../../app/controllers/poems'),
	comments = require('../../app/controllers/comments'),
	likes = require('../../app/controllers/likes');


module.exports = function(app) {
	// Poems Routes
	app.route('/poems')
		.get(poems.list)
		.post(users.requiresLogin, poems.create);

	app.route('/poems/:poemId')
		.get(poems.read)
		.put(users.requiresLogin, poems.hasAuthorization, poems.update)
		.delete(users.requiresLogin, poems.hasAuthorization, poems.delete);

	app.route('/poems/:poemId/comments')
		// .get(comments.listComments)
		.post(users.requiresLogin, comments.createComment);

	app.route('/poems/:poemId/comments/:commentId')
		.delete(users.requiresLogin, poems.hasAuthorization, comments.deleteComment);

	// Finish by binding the Poem middleware
	app.param('poemId', poems.poemByID);

	// Finish by binding the comment middleware
	app.param('commentId', comments.commentByID);
};