'use strict';

//Likes service used to communicate Poems REST endpoints
angular.module('poems').factory('Likes', ['$resource',
	function($resource) {
		return $resource('poems/:poemId/:choose/comments/:commentId/:choose', {
			update: {
				method: 'POST', params: {poemId: '@_id', commentId: '@_id', choose: 'like'}
			},
			del: {
				method: 'DELETE', params: {poemId: '@_id', commentId: '@_id', choose: 'unlike'}
			}
		});
	}
]);