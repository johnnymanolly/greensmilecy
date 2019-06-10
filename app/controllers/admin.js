myApp.controller('adminCtrl', function($scope, $window, domain) {
    
    $window.location.href = 'https://' + domain + '.scriptrapps.io/management/home.html';

});