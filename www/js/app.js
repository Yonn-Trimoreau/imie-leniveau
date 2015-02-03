'use strict';

angular.module('leniveauApp', 
	[
     	'ionic',
     	'ngMockE2E',
     	'ng-token-auth',
     	'leniveauApp.qrCode',
        'leniveauApp.manageErrors',
        'leniveauApp.login',
        'leniveauApp.signup',
        'leniveauApp.forgotPass',
        'leniveauApp.sideMenu',
        'leniveauApp.artisan',
        'leniveauApp.avis'
    ])

.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
}])


//Setting API's url globally
.constant('apiUrl','mocks/')

//Configure the app
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$authProvider', 'apiUrl', '$ionicConfigProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider, apiUrl, $ionicConfigProvider) {

	//Configure states
	$stateProvider
	.state('qrcode', {
		url: '/qrcode/:id',
		controller: 'QrCodeCtrl'
	})
	.state('auth', {
		templateUrl: 'js/auth/auth.html'
	})
	.state('auth.login', {
		url: '/login',
		templateUrl: 'js/auth/login.html',
		controller: 'LoginCtrl'
	})
	.state('auth.signup', {
		url: '/signup',
		templateUrl: 'js/auth/signup.html',
		controller: 'SignupCtrl'
	})
	.state('auth.forgotpass', {
		url: '/forgot-pass',
		templateUrl: 'js/auth/forgotPass.html',
		controller: 'ForgotPassCtrl'
	})
		//This is where security accessing logged pages happens
	.state('logged', {
		abstract: true,
		templateUrl: 'js/side-menu/sideMenu.html',
		controller: 'SideMenuCtrl',
		resolve: {
			auth: ['$auth', '$state', function($auth, $state){
				var promise = $auth.validateUser();
				promise.catch(function(){
					$state.go('auth.login');
				});
				return promise;
			}]
		}
	})
	.state('logged.artisan', {
		url: '/artisan',
		templateUrl: 'js/artisan/artisan.html',
		controller: 'ArtisanCtrl'
	})
	.state('logged.avis', {
      url: '/avis',
      abstract:true,
      templateUrl: 'js/avis/avis.html',
	  controller: 'AvisCtrl'
    })
    .state('logged.avis.commentaire', {
    	url: '/commentaire',
    	views: {
    		'commentaireContent': {
    			templateUrl: 'js/avis/commentaire/commentaire.html',
            	controller:'CommentaireCtrl'
    		}
    	}
    })
    .state('logged.avis.details', {
    	url: '/details',
    	views: {
    		'detailsContent': {
    			templateUrl: 'js/avis/details/details.html',
    	    	controller: 'DetailsCtrl'
    		}
    	}
    });

	//Redirect to home if wrong url entry point
	$urlRouterProvider.otherwise('/qrcode/1');
	
	//Configure authentication
	$authProvider.configure({
        apiUrl:                  apiUrl,
        tokenValidationPath:     '/auth/validate-token',
        signOutUrl:              '/auth/sign-out',
        emailRegistrationPath:   '/auth',
        accountUpdatePath:       '/auth',
        accountDeletePath:       '/auth',
        confirmationSuccessUrl:  window.location.href,
        passwordResetPath:       '/auth/password',
        passwordUpdatePath:      '/auth/password',
        passwordResetSuccessUrl: window.location.href,
        emailSignInPath:         '/auth/sign-in',
        storage:                 'localStorage',
        tokenFormat: {
          "access-token": "{{ token }}",
          "token-type":   "Bearer",
          "client":       "{{ clientId }}",
          "expiry":       "{{ expiry }}",
          "uid":          "{{ uid }}"
        }
    });
	
	//Set default view config
	$ionicConfigProvider.tabs.position('bottom');
	$ionicConfigProvider.views.transition('ios');
	$ionicConfigProvider.backButton.icon('ion-arrow-left-c');
	$ionicConfigProvider.navBar.alignTitle('center');
	
	// Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
}]);
