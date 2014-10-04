'use strict';

// Poems controller
angular.module('poems').controller('PoemsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Poems',
	function($scope, $stateParams, $location, Authentication, Poems ) {
		$scope.authentication = Authentication;

		// Create new Poem
		$scope.create = function() {
			// Create new Poem object
			var poem = new Poems ({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			poem.$save(function(response) {
				$location.path('poems/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Poem
		$scope.remove = function( poem ) {
			if ( poem ) { poem.$remove();

				for (var i in $scope.poems ) {
					if ($scope.poems [i] === poem ) {
						$scope.poems.splice(i, 1);
					}
				}
			} else {
				$scope.poem.$remove(function() {
					$location.path('poems');
				});
			}
		};

		// Update existing Poem
		$scope.update = function() {
			var poem = $scope.poem ;

			poem.$update(function() {
				$location.path('poems/' + poem._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Poems
		$scope.find = function() {
			$scope.poems = Poems.query();
		};

		// Find existing Poem
		$scope.findOne = function() {
			$scope.poem = Poems.get({ 
				poemId: $stateParams.poemId
			});
		};
	}
]);