'use strict';

// Poems controller
angular.module('poems').controller('PoemsController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Poems', 'Comments', 'Likes',
	function($scope, $state, $stateParams, $location, Authentication, Poems, Comments, Likes ) {
		$scope.authentication = Authentication;
		$scope.liked = false;

		// Create new Poem
		$scope.create = function() {
			// Create new Poem object
			var poem = new Poems ({
				title: this.title,
				content: this.content,
				category: this.category
			});

			// Redirect after save
			poem.$save(function(response) {
				$location.path('poems/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
				$scope.category = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Make a comment
		$scope.makeComment = function() {
			//make new comment object
			var comment = new Comments ({
				poemId: this.poem._id,
				comment: this.commentMade
			});

			// save comment
			comment.$save(function(response) {
				$state.reload();
				$scope.poem = response;
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            // clear comment field
            $scope.commentMade = '';
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

		//Delete Comment
		$scope.deleteComment = function() {
			var comment = new Comments({
				poemId: $scope.poem._id,
				_id: comment._id,
				creator: comment.creator
			});

			comment.$remove(function(response){
				$scope.poem = response;
			});
		};

		//Like Poem
		$scope.likePoem = function() {

		};

		//Unlike Poem
		$scope.unlikePoem = function() {

		};

		//Like Comment
		$scope.likeComment = function() {

		};

		//Unlike Comment 
		$scope.unlikeComment = function() {

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