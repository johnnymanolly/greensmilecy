myApp.controller('mainCtrl', function($scope, $timeout, $location, $interval, routingService, initService, dataService, account, time, authSig) {
    
    var vm = this;

    vm.showCart = false;

    vm.showHomeTitlePage = true;
    vm.showLogo = true;
    vm.showSubscribe = true;
    vm.showFooter = true;
    vm.showComingSoon = false;
    vm.showSection = true;
    vm.show404Error = false;

    vm.account  = account;
    vm.time     = time;
    vm.authSig  = authSig;

    $scope.$on('$routeChangeStart', function(angularEvent, next, current) { 

        $interval.cancel(dataService.promise);
        if(next && next.$$route) {
            vm.currentRoute =  "#"+next.$$route.originalPath;
            routingService.setView(vm.currentRoute, vm);
        } else {
            angularEvent.preventDefault();
        }
        window.scrollTo(0,0);
    });

    initService.initLoading($timeout);  

    dataService.callApi("management/api/settings", null , "post").then(
    function(data, response)
    {

        if(data.documents.length > 0)
        {
            var settings = {};
            settings["hidePhotos"]          = data.documents[0].hidePhotos;
            settings["takeawayEnabled"]     = data.documents[0].takeawayEnabled;
            settings["deliveryEnabled"]     = data.documents[0].deliveryEnabled;
            settings["onlinePayment"]       = data.documents[0].onlinePayment;
            settings["deliveryTimeout"]     = data.documents[0].deliveryTimeout;
            settings["deliveryTime"]        = data.documents[0].deliveryTime;
            settings["deliveryFee"]         = data.documents[0].deliveryFee;
            settings["takeawayTime"]        = data.documents[0].takeawayTime;
            settings["minOrder"]            = data.documents[0].minOrder;

            localStorage.settings = JSON.stringify(settings);

        }
        
    },
    function(err)
    {
        console.log("reject", err);
    }); 

    $scope.$on('$viewContentLoaded', function(){

        if(!vm.initTrigger)
        {
             $timeout( function()
             {
                initService.initCountDown();
                initService.initCounterUp();
                initService.initProgressBar();
                initService.initVideos();

                initService.initRevoSlider();
                initService.initBackToTop();
                initService.initHeader();

                $('#menu-cart-ic').on('click', function(e)
                {
                    e.stopPropagation();
                });

                $(window).on('click', function()
                {
                    $('#menu-cart-ic').removeClass('show-menu-click showed');
                })

                vm.initTrigger = true;
              }, 1000);

        }

    });

    $scope.$on('setUserProfile', function(event, user)
    {
        if(user)
        {
            vm.isLoggedIn = true;
            vm.username = user.name;
        }
        else
        {
            vm.isLoggedIn = false;
        }
    });

    $scope.$on('updateBasketItems', function(event, objInfo)
    {
       vm.total_amount = objInfo.total_amount;
       vm.items_counter = objInfo.items_counter;
       vm.my_basket_products_array = dataService.getBasketItemsArray();
    });

    vm.isLoggedIn = dataService.isLoggedIn($scope);

    vm.redirect = function(routing){
       $location.url("/"+routing);
    }

  //  vm.added_products = dataService.getBasketItems();
    var total = dataService.calc_total();

    vm.total_amount  = total.total_amount;
    vm.items_counter = total.items_counter;


    vm.my_basket_products_array = dataService.getBasketItemsArray();


    vm.removeProduct = function(key)
    {
        dataService.removeProduct(key, $scope);

        // set products inputs
        // angular.element('#id_grid_prod_input_'+key).val("1");
        // angular.element('#id_list_prod_input_'+key).val("1");
        // angular.element('#id_promotion_prod_input_'+key).val("1");
        // angular.element('#id_prod_single_input_'+key).val("1");
        // angular.element('#id_related_prod_input_'+key).val("1");
        // angular.element('#id_wish_prod_input_'+key).val("1");

        // rerender products
        $scope.$broadcast('rerenderShopCartProducts', dataService.getBasketItems());
        $scope.$broadcast('rerenderPlaceOrderProductsList', dataService.getBasketItems());
        
    }

    vm.subscribe = function()
    {
        if(!vm.email)
        {
            return;
        }
        
        var params = {login : vm.email};
        vm.loading = true;
        dataService.callApi("management/api/subscribe", params, "post", true).then(
            function(data, response)
            {
                vm.loading = false;
                vm.email = "";
                if(data.status == "success")
                {
                   
                }
            }, 
            function(err)
            {
                vm.loading = false;
                vm.email = "";
                console.log("reject", err);
            });
    }

    vm.showHideCart = function()
    {
        if(vm.showCart)
        {
           vm.showCart = false;
        }
        else
        {
           vm.showCart = true; 
        }
    }

    vm.searchProduct = function(product)
    {
        $location.url("/products?search="+product); 
    }

});