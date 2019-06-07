myApp.controller('galleryCtrl', function($scope, $timeout, $location, initService, dataService, account, time, authSig,) {
    
    var vm = this;

    vm.account = account;
    vm.time = time;
    vm.authSig = authSig;

    $scope.$on('$viewContentLoaded', function(angularEvent, next, current) { 

        var elmnt = document.getElementById("gallery");
        elmnt.scrollIntoView();

    });

    dataService.getCategories().then(
        function(data, response) {
            vm.categories = data;
            vm.categoriesType = [];
            for(var i = 0; i < vm.categories.length; i++)
            {
                if(!_.contains(vm.categoriesType, vm.categories[i]["type"]))
                {
                    vm.categoriesType.push(vm.categories[i]["type"]);
                }
            }
            $timeout(function()
            {
                initService.initGallery();  
                initService.initSlick();
            }, 1000);
        },
        function(err) {
            console.log("reject", err);
        }
    ); 

    vm.openCategory = function(key)
    {
         $location.url("/products?catKey="+key);
    }
    
});