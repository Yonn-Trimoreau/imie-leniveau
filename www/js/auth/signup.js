'use strict';

angular.module('leniveauApp.signup', [])
       .controller('SignupCtrl', ['$rootScope', '$scope', '$state', 'errorsService', '$http', 'apiUrl', function($rootScope, $scope, $state, errorsService, $http, apiUrl) {
    
    $scope.submitSignup = function(signupForm){
    	$http.post(apiUrl+'/auth/sign-up', signupForm)
    		.success(function(data){
    			$rootScope.submitLogin({email:signupForm.email, password:signupForm.password})
    		})
    		.error(function(data, status){ errorsService.displayError("L'inscription a échouée", data, status); });
    };
    
    $scope.$on('auth:login-success', function(ev, user){
        $state.go("logged.avis.commentaire");
    });

    $scope.$on('auth:login-error', function(ev, data){ errorsService.displayError("La connexion a échouée",data,401); });
}]);