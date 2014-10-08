'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core'),
		poems = require('../../app/controllers/poems'),
		comments = require('../../app/controllers/comments'),
		likes = require('../../app/controllers/likes');
	app.route('/').get(core.index);
};