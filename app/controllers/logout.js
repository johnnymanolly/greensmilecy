myApp.controller('logoutCtrl', function($scope, $sce, $routeParams) {
    var vm = this;
    $.removeCookie('user_token',{'path':'/'});
    localStorage.removeItem("userProfile")
    window.location.hash = '#/login';
});