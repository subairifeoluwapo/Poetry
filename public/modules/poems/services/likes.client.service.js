'use strict';

//LikesPoem service used to communicate Poems REST endpoints
angular.module('poems').factory('LikesPoem', ['$resource',
	function($resource) {
		return $resource('poems/:poemId/:choose', {}, {
			save: {
				method: 'POST', params: {choose: 'like', poemId: '@poemId'}
			},
			unsave: {
				method: 'DELETE', params: {choose: 'unlike', poemId: '@poemId'}
			}
		});
	}
]);

//LikesComment service used to communicate Poems REST endpoints
angular.module('poems').factory('LikesComment', ['$resource',
	function($resource) {
		return $resource('poems/:poemId/comments/:commentId/:choose', {}, {
			save: {
				method: 'POST', params: {choose: 'like', poemId: '@poemId', commentId:'@_id'}
			},
			unsave: {
				method: 'DELETE', params: {choose: 'unlike',  poemId: '@poemId', commentId:'@_id'}
			}
		});
	}
]);