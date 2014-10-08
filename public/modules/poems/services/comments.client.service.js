'use strict';

//Comments service used to communicate Poems REST endpoints
angular.module('poems').factory('Comments', ['$resource',
	function($resource) {
		return $resource('poems/:poemId/comments/:commentId', {
			poemId: '@poemId', commentId: '@_id'
		});
	}
]);