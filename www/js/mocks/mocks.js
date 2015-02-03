'use strict';

angular.module('leniveauApp')
       .run(['$httpBackend','apiUrl',function($httpBackend,apiUrl) {
    	   
    //Send all html files
    $httpBackend.whenGET(/.+html/).passThrough();
    
    var mockUsers = [
        {
            email:"client@client.com",
            password:"client",
            fullname:"David Tonsac",
            creation:"1419375259419"
        }
    ];
    
    var mockUsersIdCounter = 1; mockUsers.forEach(function(user) { user.id = mockUsersIdCounter++; });
    var mockUserById = mockUsers.reduce(function(h, user) { h[user.id] = user; return h; }, {});
    var mockUserByEmail = mockUsers.reduce(function(h, user) { h[user.email] = user; return h; }, {});
    
    var mockArtisans = [
        {
        	name:"ETS Chevreux Pascal",
        	activity:"Menuiserie Couverture",
        	address:"23 allée des Lilas, 35000 Rennes"
        },
        {
        	name:"Menguy Charpente",
        	activity:"Charpente",
        	address:"45 allée du beaupréau"
        }
    ];
    
    var mockArtisansIdCounter = 1; mockArtisans.forEach(function(artisan) { artisan.id = mockArtisansIdCounter++; });
    var mockArtisanById = mockArtisans.reduce(function(h, artisan) { h[artisan.id] = artisan; return h; }, {});
    
    var connectedUser = null;
    
    /*
     *  Get artisan by id
     */
    $httpBackend.whenPOST(apiUrl+'get-artisan').respond(function(method, url, data) {
    	data = JSON.parse(data);
    	
    	if(mockArtisanById[data.id] !== undefined){
    		return [200,JSON.stringify(mockArtisanById[data.id]),{}];
    	}
    	else{
    		return [400, JSON.stringify({errorCode:10002}),{}];
    	}
    });
    
    /*
     *  Log in
     */
    $httpBackend.whenPOST(apiUrl+'/auth/sign-in').respond(function(method, url, data) {
    	data = JSON.parse(data);
        
        if(mockUserByEmail[data.email] !== undefined){
            
            var user = mockUserByEmail[data.email];
            
            if(user.password === data.password){
                user.provider = "email";
                user.uid = user.email;
                
                var tokenHeaders = {
                    "Access-Control-Allow-Credentials":true,
                    "Access-Control-Expose-Headers":"access-token, expiry, token-type, uid, client",
                    "Access-Token":"7VnN0KIDWXhmSp58kp2YmQ",
                    "Client":"zIqGV4VYjuHrn6V8svUYTwi",
                    "Expiry":new Date().setDate(new Date().getDate() + 1).valueOf(),
                    "Token-Type":"Bearer",
                    "Uid":user.email
                };
                
                connectedUser = user;
                
                return[200,JSON.stringify({data:user}),tokenHeaders];
            }
            
            else{ return[401,JSON.stringify({errorCode:10001}),{}]; }
            
        }
        else{ return[401,JSON.stringify({errorCode:10001}),{}]; }
    	
    });
    
    /*
     *  Sign up
     */
    $httpBackend.whenPOST(apiUrl+'/auth/sign-up').respond(function(method, url, data, headers){
    	data = JSON.parse(data);
    	
    	var user = data;
    	user.id = mockUsersIdCounter++;
    	user.roleId = 1;
    	user.creation = new Date().valueOf();
    	
    	mockUsers.push(user);
    	mockUserById[user.id] = user;
    	mockUserByEmail[user.email] = user;
    	
    	var tokenHeaders = {
            "Access-Control-Allow-Credentials":true,
            "Access-Control-Expose-Headers":"access-token, expiry, token-type, uid, client",
            "Access-Token":"7VnN0KIDWXhmSp58kp2YmQ",
            "Client":"zIqGV4VYjuHrn6V8svUYTwi",
            "Expiry":new Date().setDate(new Date().getDate() + 1).valueOf(),
            "Token-Type":"Bearer",
            "Uid":user.email
        };
    	
    	return[200,JSON.stringify({data:user}),tokenHeaders];
    });
    
    /*
     *  Validate Token
     */
    $httpBackend.whenGET(apiUrl+'/auth/validate-token').respond(function(method, url, data, headers) {
        
  	  if(mockUserByEmail[headers.uid] !== undefined){
            
            var user = mockUserByEmail[headers.uid];
            user.provider = "email";
            user.uid = user.email;
            
            var tokenHeaders = {
                "Access-Control-Allow-Credentials":true,
                "Access-Control-Expose-Headers":"access-token, expiry, token-type, uid, client",
                "Access-Token":"7VnN0KIDWXhmSp58kp2YmQ",
                "Client":"zIqGV4VYjuHrn6V8svUYTwi",
                "Expiry":new Date().setDate(new Date().getDate() + 1).valueOf(),
                "Token-Type":"Bearer",
                "Uid":user.email
            };
            
            connectedUser = user;
            
            return[200,JSON.stringify({data:user,success:true}),tokenHeaders];
        }
        else{ return[401,JSON.stringify({success:false}),{}]; }
    });
    
    /*
     *  Sign out
     */
    $httpBackend.when('DELETE',apiUrl+'/auth/sign-out').respond(function(method, url, data, headers) {
        if((headers['access-token'] === "7VnN0KIDWXhmSp58kp2YmQ") && (headers.uid === connectedUser.email)){
            return[200,JSON.stringify({success:true}),{"Access-Control-Expose-Headers":"access-token, expiry, token-type, uid, client"}];
        }
        else{
            return[401,JSON.stringify({success:false}),{}];
        }
    });

}]);