'use strict';

angular.module('leniveauApp.avis')
       .controller('CommentaireCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

    if($rootScope.avis !== undefined){
    	$rootScope.avis = {};
    	$rootScope.title = "";
    	$rootScope.description = "";
    	$rootScope.rating = 3;
    }
}]);