'use strict';

angular.module('leniveauApp.qrCode', [])
       .controller('QrCodeCtrl', ['$stateParams', '$state', function($stateParams, $state){
      
    window.localStorage['artisan'] = $stateParams.id;
    $state.go("auth.login",{},{location:false});
}]);
