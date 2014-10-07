'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Poem = mongoose.model('Poem'),
    _ = require('lodash');
var poems = require('../../app/controllers/poems');
var comments = require('../../app/controllers/comments');

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
        for(var i = 0; i < poem.likes.length; i++) {
           if (req.user.id === poem.likes[i].user.toString()) {
               Liked = true;
               break;
            }
        }
        if (!Liked) {
            poem.likes.push(like);

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
  var poem = req.poem;
	var comment = req.comment,
        like = req.body;
        like.user = req.user;
    var Liked = false; 
    
    if (req.user.id === comment.creator.toString()) { 
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

exports.unlikePoem = function(req, res) {
   var poem = req.poem, index, unLike = true;

    for(var i = 0; i < poem.likes.length; i++){
        if(req.user.id === poem.likes[i].user.toString()){
           index = i;
           unLike = false;
        }
    }
    
    if (!unLike) {
        poem.likes.id(poem.likes[index]._id).remove();
        poem.save(function(err) {
            if (err) {
                return res.send(400, {
                    message: ''
                });
            } else {
                return res.jsonp(poem);
            }
        });
    } else {
         return res.send(400, {
           message: 'You have no likes yet'
         });
    }
};

exports.unlikeComment = function(req, res) {
   var poem = req.poem, index, unLike = true;
  var comment = req.comment, index, unLike = true;

    for(var i = 0; i < comment.likes.length; i++){
        if(req.user.id === comment.likes[i].user.toString()){
           index = i;
           unLike = false;
        }
    }
    
    if (!unLike) {
        comment.likes.id(comment.likes[index]._id).remove();
        poem.save(function(err) {
            if (err) {
                return res.send(400, {
                    message: ''
                });
            } else {
                return res.jsonp(poem);
            }
        });
    } else {
         return res.send(400, {
           message: 'You have no likes yet'
         });
    }
};

