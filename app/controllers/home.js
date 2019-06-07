

myApp.controller('homeCtrl', function($scope, $timeout, initService) {
	
 	var vm = this;

 	$timeout(function()
 	{
		initService.initGallery();
	    initService.initSlick();
	    initService.initParallax100();
 	}, 1000);
    

});