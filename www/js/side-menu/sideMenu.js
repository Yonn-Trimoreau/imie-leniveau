'use strict';

angular.module('leniveauApp.sideMenu', [])
       .controller('SideMenuCtrl', ['$scope', '$auth', '$state', 'errorsService', '$ionicSideMenuDelegate', function($scope, $auth, $state, errorsService, $ionicSideMenuDelegate) {
    
    $scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.avis = function() { $state.go('logged.avis.commentaire'); };
    $scope.artisan = function() { $state.go('logged.artisan'); };
    $scope.logOut = function() { $auth.signOut(); };
    	   
    $scope.$on('auth:logout-success', function(ev, user){
    	$state.go('auth.login');
        $scope.toggleLeft();
    });

    $scope.$on('auth:logout-error', function(ev, data){ errorsService.displayError("La déconnexion a échouée",data,401); });
}]);
