'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', 'Poems',
	function($scope, $http, Authentication, Poems) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		//get all the Poemss in the database
        $scope.find = function() {
            $scope.poems = Poems.query();
        };
	

		//Find a Specific Poem by Title or Category
		$scope.findSpecificPoem = function() {
			var url = 'poems/search';
			var config = {
				params: {}
			};
			config.params.q = $scope.searchForPoem;
			config.params.catg = $scope.searchForPoem;
			$scope.loading = true;
			$http.get(url, config).success(function(response){
				$scope.loading = false;
				if(response.length === 0){
					$scope.noPoems = 'No poems matching that title or category';
				} else {
					$scope.noPoems = '';
					$scope.foundPoems = response;
				}
			});
		};
	}
	
]);