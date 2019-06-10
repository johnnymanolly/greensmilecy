myApp.controller('comingSoonCtrl', function($scope, $location, $timeout, initService) {

	$location.url("/comingSoon");

	$timeout(function () 
    {
    	initService.initCountDown();
    }, 
    100);

});