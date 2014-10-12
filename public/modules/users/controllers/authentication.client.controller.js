'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');
		$scope.EMAIL_REGEXP = 	/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		$scope.url_regex = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})?$/;
		
		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		//Allow users the ability to remove error messages from the screen
		$scope.removeError = function() {
			$scope.error = null;
		};
	}
]);


angular.module('users').directive('ngConfirmField', function () {
  return {
    require: 'ngModel',
    scope: {
      confirmAgainst: '=',
    },
    link: function (scope, iElement, iAttrs, ngModelCtrl) {

      var updateValidity = function () {
        var viewValue = ngModelCtrl.$viewValue;
        var isValid = isFieldValid();
        if(ngModelCtrl.$viewValue)
        ngModelCtrl.$setValidity('noMatch', isValid);
        // If the field is not valid, return undefined.
        return isValid ? viewValue : undefined;
      };

      // Test the confirm field view value matches the confirm against value.
      var isFieldValid = function () {
        return ngModelCtrl.$viewValue === scope.confirmAgainst;
      };

      // Convert data from view format to model format
      ngModelCtrl.$parsers.push(updateValidity);

      // Watch for changes in the confirmAgainst model.
      scope.$watch('confirmAgainst', updateValidity);
    }
  };
});