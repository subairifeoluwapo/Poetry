'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core'),
		poems = require('../../app/controllers/poems');
	app.route('/').get(core.index);
};