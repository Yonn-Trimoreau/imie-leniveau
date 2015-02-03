'use strict';

angular.module('leniveauApp.login', [])
       .controller('LoginCtrl', ['$scope', '$auth', '$state', 'errorsService', function($scope, $auth, $state, errorsService) {

    $auth.validateUser();
    
    $scope.loginForm = {};
    
    $scope.$on('auth:login-success', function(ev, user){
        $state.go("logged.artisan");
            
        delete $scope.loginForm.email;
        delete $scope.loginForm.password;
    });
    $scope.$on('auth:validation-success', function(ev, user){ $state.go("logged.artisan");});
    
    $scope.$on('auth:validation-error', function(ev, data){ errorsService.displayError("La connexion a échouée",data,401); });
    $scope.$on('auth:login-error', function(ev, data){ errorsService.displayError("La connexion a échouée",data,401); });
}]);
