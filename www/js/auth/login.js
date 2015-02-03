'use strict';

angular.module('leniveauApp.login', [])
       .controller('LoginCtrl', ['$scope', '$auth', '$state', 'errorsService', '$http', function($scope, $auth, $state, errorsService, $http) {

    $auth.validateUser();
    
    $scope.loginForm = {};
    
    $scope.sendLogin = function(loginForm){
    	var contentType ="application/x-www-form-urlencoded; charset=utf-8";
    	 
    	if(window.XDomainRequest) //for IE8,IE9
    	    contentType = "text/plain";
    	 
    	$.ajax({
    	     url:"http://localhost:2010/Services/Connexion.ashx",
    	     data:"user_connect_email="+loginForm.user_connect_email+"&user_connect_pwd1="+loginForm.user_connect_pwd1,
    	     type:"POST",
    	     dataType:"json",   
    	     contentType:contentType,    
    	     success:function(data)
    	     {
    	        alert("Data from Server"+JSON.stringify(data));
    	     },
    	     error:function(jqXHR,textStatus,errorThrown)
    	     {
    	        alert("You can not send Cross Domain AJAX requests: "+errorThrown);
    	     }
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
