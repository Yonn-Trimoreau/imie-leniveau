'use strict';

angular.module('leniveauApp.avis')
       .controller('DetailsCtrl', ['$rootScope', '$scope', 'apiUrl', '$http', function($rootScope, $scope, apiUrl, $http) {
    
    if($rootScope.qualiteIntervention === undefined){
    	$rootScope.qualiteIntervention = 3;
    	$rootScope.qualitePrix = 3;
    	$rootScope.relationClient = 3;
    	$rootScope.qualiteFinitions = 3;
    	$rootScope.propreteChantier = 3;
    	$rootScope.conseil = 3;
    }
    	   
    $scope.submitAvis = function(){
    	$http.post(apiUrl)
    }
    
}]);