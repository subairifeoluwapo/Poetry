'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Poem = mongoose.model('Poem'),
    _ = require('lodash');
var poem = require('../../app/controllers/poems'),
	comments = require('../../app/controllers/comments');

exports.likePoem = function(req, res) {
	 var poem = req.poem,
        like = req.body;
        like.user = req.user;
    var Liked = false; 
    
    if (req.user.id === poem.user._id.toString()) { 
        return res.send(400, {
               message: 'You cannot like your own post'
        });
    } else {
        for(var i = 0; i < poem.like.length; i++) {
           if (req.user.id === poem.like[i].user.toString()) {
               Liked = true;
               break;
            }
        }
        if (!Liked) {
            poem.like.push(like);

            poem.save(function(err) {
               if (err) {
                   return res.send(400, {
                      message: ''
                   });
                } else {
                    res.jsonp(poem);
                }
            });
        } 
        else {
            return res.send(400, {
               message: 'you have already liked this post before'
            });
        }
    }

};

exports.likeComment = function(req, res) {
	var comment = req.comment,
        like = req.body;
        like.user = req.user;
    var Liked = false; 
    
    if (req.user.id === comment.user._id.toString()) { 
        return res.send(400, {
               message: 'You cannot like your own post'
        });
    } else {
        for(var i = 0; i < comment.likes.length; i++) {
           if (req.user.id === comment.likes[i].user.toString()) {
               Liked = true;
               break;
            }
        }
        if (!Liked) {
            comment.likes.push(like);

            comment.save(function(err) {
               if (err) {
                   return res.send(400, {
                      message: ''
                   });
                } else {
                    res.jsonp(poem);
                }
            });
        } 
        else {
            return res.send(400, {
               message: 'you have already liked this post before'
            });
        }
    }
};

exports.unlikePoem = function(req, res) {

};

exports.unlikeComment = function(req, res) {

};
