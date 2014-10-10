'use strict';

// Poems controller
angular.module('poems').controller('PoemsController', ['$scope', '$http' , '$state', '$stateParams', '$location', 'Authentication', 'Poems', 'Comments', 'LikesPoem', 'LikesComment', 'SearchPoems',
	function($scope, $http, $state, $stateParams, $location, Authentication, Poems, Comments, LikesPoem, LikesComment, SearchPoems) {
		$scope.authentication = Authentication;
		$scope.liked = false;
		$scope.likedCom = false;

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
				$scope.poem = response;
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
			$state.reload();

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
				_id: this.comment._id,
			});
			comm.$remove(function(response){
				$scope.poem = response;
				$state.reload();
			});
			$state.reload();
		};

		//Like Poem
		$scope.likePoem = function() {
			var likepoem = new LikesPoem ({
				poemId: this.poem._id,
				choose: 'like'
			});
			//save like
			likepoem.$save(function(response){
				$scope.poem = response;
				$scope.liked = true;
			}, function(errorResponse) {
				$scope.likeError = errorResponse.data.message;
			});
			$state.reload();
		};

		//Unlike Poem
		$scope.unlikePoem = function() {
			var unlikepoem = new LikesPoem ({
				poemId: this.poem._id,
				choose: 'unlike'
			});
			//save unlike
			unlikepoem.$unsave(function(response){
				$scope.poem = response;
				$scope.liked = false;
			}, function(errorResponse) {
				$scope.likeError = errorResponse.data.message;
			});
			$state.reload();
		};

		//checks if user has already liked a poem
        $scope.checkUserPoemLikes = function(likes) {
           for (var i in likes) {
                if (likes[i].user === $scope.authentication.user._id) {
                    $scope.liked = true;
                    // $scope.likedCom = true;
                    return true;
                }
            } 
            return false; 
        };

		//Like Comment
		$scope.likeComment = function() {
			var likecomment = new LikesComment ({
				poemId: $scope.poem._id,
				_id: this.comment._id,
				choose: 'like',
			});
			//save like
			likecomment.$save(function(response){
				$scope.poem = response;
				$scope.likedCom = true;
			}, function(errorResponse) {
				$scope.likeError = errorResponse.data.message;
			});
			$state.reload();
		};

		//Unlike Comment 
		$scope.unlikeComment = function() {
			var unlikecomment = new LikesComment ({
				poemId: $scope.poem._id,
				_id: this.comment._id,
				choose: 'unlike'
			});
			//save unlike
			unlikecomment.$unsave(function(response){
				$scope.poem = response;
				$scope.likedCom = false;
			}, function(errorResponse) {
				$scope.likeError = errorResponse.data.message;
			});
			$state.reload();
		};

		//checks if user has already liked a comment
        $scope.checkUserCommentLikes = function(likes) {
           for (var i in likes) {
                if (likes[i].user === $scope.authentication.user._id) {
                    $scope.likedCom = true;
                    return true;
                }
            } 
            return false; 
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

// 		//Find a Specific Poem by Title
// 		$scope.findSpecificPoem = function() {
// 			var config = {
// 				url: 'poems/search',
// 				params: {callback: 'JSON_CALLBACK'}
// 			};
// 			config.params.q = $scope.searchForPoem;
// 			$http.jsonp(config).success(function(response){
// 				console.log(response);
// 			});
// 		};
	}
]);

// angular.module('poems').directive('liked', function(){
// 	return {
// 		restrict: 'AE',
// 		scope: {},
// 		transclude: true,
// 		template: '<div ng-transclude></div>',
// 		link: function(scope, element, attrs) {
// 			scope.
// 		}
// 	};
// });