'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'poetry';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngTouch',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ui.utils'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
      // Create angular module
      angular.module(moduleName, dependencies || []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('poems');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  '$http',
  'Authentication',
  'Poems',
  function ($scope, $http, Authentication, Poems) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    //get all the Poemss in the database
    $scope.find = function () {
      $scope.poems = Poems.query();
    };
    //Find a Specific Poem by Title or Category
    $scope.findSpecificPoem = function () {
      var url = 'poems/search';
      var config = { params: {} };
      if ($scope.searchForPoem === undefined || $scope.searchForPoem.length < 4) {
        $scope.invalidSearch = 'Please enter a valid search';
        $scope.noPoems = '';
      } else {
        $scope.invalidSearch = '';
        config.params.q = $scope.searchForPoem;
        config.params.catg = $scope.searchForPoem;
        $scope.loading = true;
        $http.get(url, config).success(function (response) {
          $scope.invalidSearch = '';
          $scope.loading = false;
          if (response.length === 0) {
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
]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['*'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        if (!!~this.roles.indexOf('*')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].isPublic : isPublic,
        roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].roles : roles,
        position: position || 0,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].items[itemIndex].isPublic : isPublic,
            roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].items[itemIndex].roles : roles,
            position: position || 0,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
// Configuring the Poems module
angular.module('poems').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Poems', 'poems', 'dropdown', '/poems(/create)?');
    Menus.addSubMenuItem('topbar', 'poems', 'Discover Poems', 'poems');
    Menus.addSubMenuItem('topbar', 'poems', 'Compose New Poem', 'poems/create');
    Menus.addSubMenuItem('topbar', 'poems', 'My Poems', 'mypoems');
  }
]);'use strict';
//Setting up route
angular.module('poems').config([
  '$stateProvider',
  function ($stateProvider) {
    // Poems state routing
    $stateProvider.state('listPoems', {
      url: '/poems',
      templateUrl: 'modules/poems/views/list-poems.client.view.html'
    }).state('createPoem', {
      url: '/poems/create',
      templateUrl: 'modules/poems/views/create-poem.client.view.html'
    }).state('myPoems', {
      url: '/mypoems',
      templateUrl: 'modules/poems/views/my-poems.client.view.html'
    }).state('viewPoem', {
      url: '/poems/:poemId',
      templateUrl: 'modules/poems/views/view-poem.client.view.html'
    }).state('editPoem', {
      url: '/poems/:poemId/edit',
      templateUrl: 'modules/poems/views/edit-poem.client.view.html'
    }).state('otherwise', { url: '#!/' });
  }
]);'use strict';
// Poems controller
angular.module('poems').controller('PoemsController', [
  '$scope',
  '$http',
  '$state',
  '$stateParams',
  '$location',
  'Authentication',
  'Poems',
  'Comments',
  'LikesPoem',
  'LikesComment',
  function ($scope, $http, $state, $stateParams, $location, Authentication, Poems, Comments, LikesPoem, LikesComment) {
    $scope.authentication = Authentication;
    $scope.liked = false;
    // Create new Poem
    $scope.create = function () {
      if ($scope.title.length < 4) {
        $scope.invalidPoemContent = '';
        $scope.invalidPoemCategory = '';
        $scope.invalidPoemTitle = 'Your poem title must be a word with atleat 3 letters';
      } else if ($scope.category.length < 4) {
        $scope.invalidPoemContent = '';
        $scope.invalidPoemTitle = '';
        $scope.invalidPoemCategory = 'Please enter one or more categories';
      } else if ($scope.content.length < 100 || $scope.content.length > 500) {
        $scope.invalidPoemTitle = '';
        $scope.invalidPoemCategory = '';
        $scope.invalidPoemContent = 'Your poem content must be between 15 to 150 words';
      } else {
        $scope.invalidPoemCategory = '';
        $scope.invalidPoemTitle = '';
        $scope.invalidPoemContent = '';
        // Create new Poem object
        var poem = new Poems({
            title: this.title,
            content: this.content,
            category: this.category
          });
        // Redirect after save
        poem.$save(function (response) {
          $location.path('poems/' + response._id);
          // Clear form fields
          $scope.title = '';
          $scope.content = '';
          $scope.category = '';
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      }
    };
    // Update existing Poem
    $scope.update = function () {
      var poem = $scope.poem;
      poem.$update(function () {
        $location.path('poems/' + poem._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Make a comment
    $scope.makeComment = function () {
      //make new comment object
      if ($scope.commentMade.length < 3 || $scope.commentMade === undefined) {
        $scope.emptycomment = 'please enter a word with 3 or more letters';
      } else {
        $scope.emptycomment = '';
        var comment = new Comments({
            poemId: this.poem._id,
            comment: this.commentMade
          });
        // save comment
        comment.$save(function (response) {
          $scope.poem = response;
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
        // $state.reload();
        // clear comment field
        $scope.commentMade = '';
      }
    };
    // Remove existing Poem
    $scope.remove = function (poem) {
      if (poem) {
        poem.$remove();
        for (var i in $scope.poems) {
          if ($scope.poems[i] === poem) {
            $scope.poems.splice(i, 1);
          }
        }
      } else {
        $scope.poem.$remove(function () {
          $location.path('poems');
        });
      }
    };
    //Delete Comment
    $scope.deleteComment = function () {
      var comm = new Comments({
          poemId: $scope.poem._id,
          _id: this.comment._id
        });
      comm.$remove(function (response) {
        $scope.poem = response;  // $state.reload();
      });  // $state.reload();
    };
    //Like Poem
    $scope.likePoem = function () {
      var likepoem = new LikesPoem({
          poemId: this.poem._id,
          choose: 'like'
        });
      //save like
      likepoem.$save(function (response) {
        $scope.poem = response;
        $scope.liked = true;
      }, function (errorResponse) {
        $scope.likeError = errorResponse.data.message;
      });  // $state.reload();
    };
    //Unlike Poem
    $scope.unlikePoem = function () {
      var unlikepoem = new LikesPoem({
          poemId: this.poem._id,
          choose: 'unlike'
        });
      //save unlike
      unlikepoem.$unsave(function (response) {
        $scope.poem = response;
        $scope.liked = false;
      }, function (errorResponse) {
        $scope.likeError = errorResponse.data.message;
      });  // $state.reload();
    };
    //checks if user has already liked a poem
    $scope.checkUserPoemLikes = function (likes) {
      for (var i in likes) {
        if (likes[i].user === $scope.authentication.user._id) {
          $scope.liked = true;
          return true;
        }
      }
      return false;
    };
    //Like Comment
    $scope.likeComment = function () {
      var likecomment = new LikesComment({
          poemId: $scope.poem._id,
          _id: this.comment._id,
          choose: 'like'
        });
      //save like
      likecomment.$save(function (response) {
        $scope.poem = response;
        $scope.hidelike = 1;
      }, function (errorResponse) {
        $scope.likeError = errorResponse.data.message;
      });
    };
    //Unlike Comment 
    $scope.unlikeComment = function () {
      var unlikecomment = new LikesComment({
          poemId: $scope.poem._id,
          _id: this.comment._id,
          choose: 'unlike'
        });
      //save unlike
      unlikecomment.$unsave(function (response) {
        $scope.poem = response;
      }, function (errorResponse) {
        $scope.likeError = errorResponse.data.message;
      });
    };
    //checks if user has already liked a comment
    $scope.checkUserCommentLikes = function (likes) {
      for (var i in likes) {
        if (likes[i].user === $scope.authentication.user._id) {
          $scope.hidelike = 1;
          return true;
        }
      }
      return false;
    };
    // Find a list of Poems
    $scope.find = function () {
      $scope.poems = Poems.query();
    };
    // Find existing Poem
    $scope.findOne = function () {
      $scope.poem = Poems.get({
        poemId: $stateParams.poemId,
        commentId: $stateParams.commentId
      });
    };
    $scope.modalShown = false;
    $scope.toggleModal = function () {
      $scope.modalShown = !$scope.modalShown;
    };
  }
]);
angular.module('poems').directive('modalDialog', function () {
  return {
    restrict: 'E',
    scope: { show: '=' },
    replace: true,
    transclude: true,
    link: function (scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function () {
        scope.show = false;
      };
    },
    template: '<div class="ng-modal" ng-show="show"><div class="ng-modal-overlay" ng-click="hideModal()"></div><div class="ng-modal-dialog" ng-style="dialogStyle"><div class= "ng-modal-close" ng-click="hideModal()"">X</div><div class="ng-modal-dialog-content" ng-transclude></div></div></div>'
  };
});'use strict';
//Comments service used to communicate Poems REST endpoints
angular.module('poems').factory('Comments', [
  '$resource',
  function ($resource) {
    return $resource('poems/:poemId/comments/:commentId', {
      poemId: '@poemId',
      commentId: '@_id'
    });
  }
]);'use strict';
//LikesPoem service used to communicate Poems REST endpoints
angular.module('poems').factory('LikesPoem', [
  '$resource',
  function ($resource) {
    return $resource('poems/:poemId/:choose', {}, {
      save: {
        method: 'POST',
        params: {
          choose: 'like',
          poemId: '@poemId'
        }
      },
      unsave: {
        method: 'DELETE',
        params: {
          choose: 'unlike',
          poemId: '@poemId'
        }
      }
    });
  }
]);
//LikesComment service used to communicate Poems REST endpoints
angular.module('poems').factory('LikesComment', [
  '$resource',
  function ($resource) {
    return $resource('poems/:poemId/comments/:commentId/:choose', {}, {
      save: {
        method: 'POST',
        params: {
          choose: 'like',
          poemId: '@poemId',
          commentId: '@_id'
        }
      },
      unsave: {
        method: 'DELETE',
        params: {
          choose: 'unlike',
          poemId: '@poemId',
          commentId: '@_id'
        }
      }
    });
  }
]);'use strict';
//Poems service used to communicate Poems REST endpoints
angular.module('poems').factory('Poems', [
  '$resource',
  function ($resource) {
    return $resource('poems/:poemId', { poemId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/authentication/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    }).state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).state('reset-invlaid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    // If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.EMAIL_REGEXP = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    $scope.url_regex = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})?$/;
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    //Allow users the ability to remove error messages from the screen
    $scope.removeError = function () {
      $scope.error = null;
    };
  }
]);
angular.module('users').directive('ngConfirmField', function () {
  return {
    require: 'ngModel',
    scope: { confirmAgainst: '=' },
    link: function (scope, iElement, iAttrs, ngModelCtrl) {
      var updateValidity = function () {
        var viewValue = ngModelCtrl.$viewValue;
        var isValid = isFieldValid();
        if (ngModelCtrl.$viewValue)
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
});'use strict';
angular.module('users').controller('PasswordController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.EMAIL_REGEXP = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    $scope.url_regex = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})?$/;
    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;
      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };
    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;
        // Attach user profile
        Authentication.user = response;
        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    $scope.EMAIL_REGEXP = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    $scope.url_regex = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})?$/;
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.removeAlert = function (message) {
      if (message === 'error') {
        $scope.error = null;
      } else {
        $scope.success = null;
      }
    };
    $scope.findUser = function () {
      $http.get('/users/me').success(function (response) {
        $scope.owner = response;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.removeUserAccount = function () {
      var url = '/users/accounts';
      $http.delete(url).success(function (response) {
        console.log(response);
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);