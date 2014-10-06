'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Poems',
	function($scope, Authentication, Poems) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		//get all the Poemss in the database
        $scope.find = function() {
            $scope.poems = Poems.query();
        };
	}
]);