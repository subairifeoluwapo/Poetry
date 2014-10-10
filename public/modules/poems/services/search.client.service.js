'use strict';

//Search service used to communicate Poems REST endpoints
angular.module('poems').factory('SearchPoems', ['$resource',
	function($resource) {
		return $resource('poems/search', {});
	}
]);