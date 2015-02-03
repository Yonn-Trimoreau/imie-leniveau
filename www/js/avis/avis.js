'use strict';

angular.module('leniveauApp.avis', ['ionic.rating'])
       .controller('AvisCtrl', ['$rootScope', function($rootScope) {

    if($rootScope.avis === undefined){
    	$rootScope.avis = {};
    }    
}]);
