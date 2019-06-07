myApp.controller('trackOrderCtrl', function($scope, $sce, $routeParams) {
    var vm = this;
    if($routeParams.key){
        vm.key = $routeParams.key
    }
    if($routeParams.deviceId){
        vm.mapsSrc = $sce.trustAsResourceUrl('https://dashboard.scriptrapps.io/management/templates/location.html?deviceId='+$routeParams.deviceId);
    }
});