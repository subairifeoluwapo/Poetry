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

		// Update existing Poem
		$scope.update = function() {
			var poem = $scope.poem ;

			poem.$update(function() {
				$location.path('poems/' + poem._id);
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
			var comm = new Comments({
				poemId: $scope.poem._id,
				_id: comment._id,
				creator: comment.creator
			});

			comm.$remove(function(response){
				$scope.poem = response;
				$state.reload();
			});
		};

		//Like Poem
		$scope.likePoem = function() {
			var like = new Likes ({
				poemId: $scope.poem._id,
				choose: "like"
			});

			like.$save(function(response){
				$scope.poem = response;
				$scope.liked = true;
				$state.reload();
			}, function(errorResponse) {
				$scope.likeError = errorResponse.data.message;
			});
		};

		//Unlike Poem
		$scope.unlikePoem = function() {
			var unlike = new Likes ({
				poemId: $scope.poem._id,
				choose: "unlike"
			});

			unlike.$destroy(function(response){
				$scope.poem = response;
				$scope.liked = false;
				$state.reload();
			}, function(errorResponse) {
				$scope.likeError = errorResponse.data.message;
			});
		};

		//checks if user has already liked a blog
        $scope.checkLikes = function(likes) {
           for (var i in likes) {
                if (likes[i].user === $scope.authentication.user._id) {
                    $scope.liked = true;
                    return true;
                }
            } 
            return false; 
        };

		//Like Comment
		$scope.likeComment = function() {
			var like = new Likes ({
				poemId: $scope.poem._id,
				commentId: $scope.comment._id,
				choose: "like"
			});

			like.$save(function(response){
				$scope.comment = response;
				$scope.liked = true;
				$state.reload();
			}, function(errorResponse) {
				$scope.likeError = errorResponse.data.message;
			});
		};

		//Unlike Comment 
		$scope.unlikeComment = function() {
			var unlike = new Likes ({
				poemId: $scope.poem._id,
				commentId: $scope.comment._id,
				choose: "unlike"
			});

			unlike.$destroy(function(response){
				$scope.comment = response;
				$scope.liked = false;
				$state.reload();
			}, function(errorResponse) {
				$scope.likeError = errorResponse.data.message;
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