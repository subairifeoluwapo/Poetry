'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Like Schema
 */
var LikeSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    nameOfLiker: {
        type: String,
        default: '',
        trim: true
    },
    gravatarUrlLike: {
        type: String,
        default: '',
        trim: true
    }
});


/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    comment: {
        type: String,
        default: '',
        required: 'Please fill in your comment',
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    nameOfCreator: {
        type: String,
        default: '',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    gravatarUrlComm: {
        type: String,
        default: '',
        trim: true
    },
    likes: [LikeSchema]
});


/**
 * Poem Schema
 */
var PoemSchema = new Schema({
    title: {
        type: String,
        default: '',
        required: 'Please fill in a Poem name',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    category: {
        type: String,
        default: '',
        required: 'Please fill in your poem category',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    gravatarUrlPoem: {
        type: String,
        default: '',
        trim: true
    },
    comments: [CommentSchema],
    likes: [LikeSchema]

});

mongoose.model('Poem', PoemSchema);
