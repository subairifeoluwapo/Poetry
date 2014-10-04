'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Poem Schema
 */
var PoemSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Poem name',
		trim: true
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Poem', PoemSchema);