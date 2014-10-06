'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Poem = mongoose.model('Poem'),
	_ = require('lodash');


/**
 * Create a Poem
 */
exports.create = function(req, res) {
	var poem = new Poem(req.body);
	poem.user = req.user;

	poem.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(poem);
		}
	});
};

/**
 * Show the current Poem
 */
exports.read = function(req, res) {
	res.jsonp(req.poem);
};

/**
 * Update a Poem
 */
exports.update = function(req, res) {
	var poem = req.poem ;

	poem = _.extend(poem , req.body);

	poem.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(poem);
		}
	});
};

/**
 * Delete an Poem
 */
exports.delete = function(req, res) {
	var poem = req.poem ;

	poem.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(poem);
		}
	});
};

/**
 * List of Poems
 */
exports.list = function(req, res) { 
	Poem.find().sort('-created').populate('user', 'displayName').exec(function(err, poems) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(poems);
		}
	});
};


/**
 * Poem middleware
 */
exports.poemByID = function(req, res, next, id) { 
	Poem.findById(id).populate('user', 'displayName').exec(function(err, poem) {
		if (err) return next(err);
		if (! poem) return next(new Error('Failed to load Poem ' + id));
		req.poem = poem ;
		next();
	});
};


/**
 * Poem authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.poem.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
