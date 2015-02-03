'use strict';

angular.module('leniveauApp.artisan', [])
       .controller('ArtisanCtrl', ['$scope', 'apiUrl', '$http', 'errorsService', function($scope, apiUrl, $http, errorsService) {

   $scope.idArtisan = window.localStorage['artisan'];
   
   if($scope.idArtisan !== undefined){
	   $http.post(apiUrl+'get-artisan', {id:$scope.idArtisan})
	       .success(function(data){
	           $scope.artisan = data;
	           console.log("hello");
	       })
	       .error(function(data, status){ console.log("bye");errorsService.displayError("L'obtention de l'artisan a échouée",data,status); });
   }
}]);
