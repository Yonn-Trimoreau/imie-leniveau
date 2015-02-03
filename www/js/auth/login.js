'use strict';

angular.module('leniveauApp.login', [])
       .controller('LoginCtrl', ['$scope', '$auth', '$state', 'errorsService', '$http', function($scope, $auth, $state, errorsService, $http) {

    $auth.validateUser();
    
    $scope.loginForm = {};
    
    $scope.sendLogin = function(loginForm){
    	$http({
    		method: 'POST',
    		url: 'http://localhost:2010/Services/Connexion.ashx',
    		data: {
    			user_connect_email:loginForm.user_connect_email,
    			user_connect_pwd1:loginForm.user_connect_pwd1
    		}
    	})
    	.success(function(data){
    		
    	})
    	.error(function(data){
    		console.log(data);
    	});
    };
    
    $scope.$on('auth:login-success', function(ev, user){
        $state.go("logged.artisan");
            
        delete $scope.loginForm.email;
        delete $scope.loginForm.password;
    });
    $scope.$on('auth:validation-success', function(ev, user){ $state.go("logged.artisan");});
    
    $scope.$on('auth:validation-error', function(ev, data){ errorsService.displayError("La connexion a échouée",data,401); });
    $scope.$on('auth:login-error', function(ev, data){ errorsService.displayError("La connexion a échouée",data,401); });
}]);
