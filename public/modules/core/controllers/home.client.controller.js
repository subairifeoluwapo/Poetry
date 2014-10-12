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
			if ($scope.searchForPoem === undefined || $scope.searchForPoem.length < 4) {
				$scope.invalidSearch = 'Please enter a valid search';
				$scope.noPoems = '';
			} else {
				$scope.invalidSearch = '';
				config.params.q = $scope.searchForPoem;
				config.params.catg = $scope.searchForPoem;
				$scope.loading = true;
				$http.get(url, config).success(function(response){
					$scope.invalidSearch = '';
					$scope.loading = false;
					if(response.length === 0){
						$scope.noPoems = 'No poems matching that title or category';
						$scope.searchForPoem = '';
					} else {
						$scope.noPoems = '';
						$scope.foundPoems = response;
					}
				});
			}
		};
	}
	
]);