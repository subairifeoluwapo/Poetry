'use strict';

//LikesPoem service used to communicate Poems REST endpoints
angular.module('poems').factory('LikesPoem', ['$resource',
	function($resource) {
		return $resource('poems/:poemId/:choose', {poemId: '@poemId'}, {
			save: {
				method: 'POST', params: {choose: 'like'}
			},
			unsave: {
				method: 'DELETE', params: {choose: 'unlike'}
			}
		});
	}
]);

//LikesComment service used to communicate Poems REST endpoints
angular.module('poems').factory('LikesComment', ['$resource',
	function($resource) {
		return $resource('poems/:poemId/comments/:commentId/:choose', {poemId: '@poemId', commentId:'@_id'}, {
			save: {
				method: 'POST', params: {choose: 'like'}
			},
			unsave: {
				method: 'DELETE', params: {choose: 'unlike'}
			}
		});
	}
]);