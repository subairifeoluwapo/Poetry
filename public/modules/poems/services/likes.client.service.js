'use strict';

//Likes service used to communicate Poems REST endpoints
angular.module('poems').factory('Likes', ['$resource',
	function($resource) {
		return $resource('poems/:poemId/:choose', {}, {
			save: {
				method: 'POST', params: {choose: "like", poemId: '@poemId'}
			},
			destroy: {
				method: 'DELETE', params: {choose: "unlike", poemId: '@poemId'}
			}
		});
	}
]);