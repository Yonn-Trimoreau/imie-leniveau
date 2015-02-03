'use strict';

angular.module('leniveauApp.manageErrors', [])
       .factory('errorsService', ['$ionicPopup', function($ionicPopup){

    return{
        displayError: function(contextDescription, data, status){
            
        	var message = "";
        	
            if(status < 500){
                
                    //Here we manage error codes
                if(data.errorCode){
                    
                    switch (data.errorCode) {
                        case 10001:
                            message = "Identifiants erronés";
                            break;
                        case 10002:
                        	message = "L'artisan n'existe pas ou plus";
                        	break;
                    }
                }
                
                    //Here we manage technical errors
                else{
                    message = "Le serveur a retourné une erreur "+status+" avec le message : "+data.errorMessage;
                }
            }
            
                //If API is not accessible
            else{
                message = "Le serveur a retourné une erreur "+status+", veuillez recommencer plus tard et nous excuser pour la gêne encourrue";
            }
            
            $ionicPopup.alert({
            	title: contextDescription,
            	template: message
            });
        }
    }
}]);