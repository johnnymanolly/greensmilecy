myApp.controller('wishlistCtrl', function($scope, $timeout, $location, initService , account, time, authSig, dataService) {
    
    var vm = this;

    vm.account  = account;
    vm.time     = time;
    vm.authSig  = authSig;

    getFavorites();

    vm.addAllToCart = function()
    {
       for(var i = 0; i < vm.products.length; i++)
       {
            var inputId= '#id_wish_prod_input_'+vm.products[i].key;
            dataService.updateBasket(inputId, vm.products[i], $scope); 
       } 
       
        vm.calc_total(); 
    }

    vm.showItemDesc = function(key)
    {
        $location.url("/productSingle/?key="+key);
    }

    vm.removeProduct = function(key)
    {
        removeProdutFromWishList(key, $scope);
    }

    vm.clearWishList = function(key)
    {
            
        var keys = [];
        for(var i = 0; i < vm.products.length; i++)
        {
            keys.push(vm.products[i]['key']);    
        }
        removeProdutFromWishList(keys, $scope);  
    }

    // vm.updateBasket = function(product)
    // {
    //     var inputId= '#id_wish_prod_input_'+product.key;
    //     dataService.updateBasket(inputId, product, $scope); 
    //     vm.calc_total();
    // }

    vm.calc_total = function()
    {
        var total = dataService.calc_total($scope);
        vm.total_amount  = total.total_amount;
        vm.items_counter = total.items_counter;
    }

    function getFavorites()
    {
        var params = {};
        params["login"] = JSON.parse(localStorage.userProfile).login;

        vm.loading = true;
        dataService.addToFavorites(params).then(

            function(data, response)
            {
                if(data && data.documents)
                {
                    console.log(data.documents);
                    vm.products = data.documents;
                    vm.loading = false;

                    $timeout(function ()
                    {
                       initService.initProducts();
                       initService.initAddProducts();
                    }, 100);
                }
            },
            function(err)
            {
                vm.loading = false;
                console.log("reject", err);
            }
        );     
    }

    function removeProdutFromWishList(keys)
    {
        var params = {};
        params["login"] = JSON.parse(localStorage.userProfile).login;
        params["action"] = "delete";
        if(typeof keys == 'string')
        {
            keys = [keys];
        }
        params["keys"] = keys;
        vm.loading = true;
        window.scrollTo(0,0);
        dataService.addToFavorites(params).then(

            function(data, response)
            {
                if(data)
                {
                    getFavorites();
                }
            },
            function(err)
            {
                console.log("reject", err);
                vm.loading = false;
            }
        );     
    }

    vm.onAddItem = function(product) 
    {
        vm.selectedProduct = product;

        // loop over ingredients and render select boxes
        if(product.default_ingredients)
        {
            if(typeof product.default_ingredients == 'string') product.default_ingredients = [product.default_ingredients];
            vm.defaultIngredients =  product.default_ingredients;
            // set all selected by default
            vm.defaultIngredientsFilters = angular.copy(product.default_ingredients);
            if(!vm.defaultIngredientsFilters)
            {
                vm.defaultIngredientsFilters = [];
            }
        }
        else
        {
            vm.defaultIngredients = null;
        }
        
        // loop over ingredients and render select boxes
        if(product.extra_ingredients)
        {
            if(typeof product.extra_ingredients == 'string') product.extra_ingredients = [product.extra_ingredients];
            vm.extraIngredients = product.extra_ingredients;    
            vm.extraIngredientsFilters = [];
        }
        else
        {
            vm.extraIngredients = null;
        }

        $timeout(function ()
        {
             // reset values
            vm.comments = "";
            $('#portion').prop('checked',true);
            angular.element('#id_popup_prod_input_'+product.key).val("1");
        }, 200);

        // var modalInstance =  $uibModal.open({
        //     templateUrl: "templates/shop/CustomizePopup.html",
        //     controller: "customizeModalCtrl as vm",
        //     size: '',
        // });

        // modalInstance.result.then(function(product)
        // {
        //     vm.updateBasket(product);
        // });

    }


    // Add to cart
    vm.updateBasket = function(product)
    {
        product = vm.selectedProduct;
        
        var all_ingredients = [];
        if(product.default_ingredients)
        {
            product["default_ingredients_selected_by_user"] = vm.defaultIngredientsFilters;
            all_ingredients.push(product["default_ingredients_selected_by_user"]);
        }

        if(product.extra_ingredients)
        {
            product["extra_ingredients_selected_by_user"]  = vm.extraIngredientsFilters;
            all_ingredients = _.union(product["default_ingredients_selected_by_user"], product["extra_ingredients_selected_by_user"]);
        }

        if(all_ingredients.length > 0)
        {
            product["ingredients"] = all_ingredients;
        }
         
        product["comments"] = vm.comments;
        product["portion"] = $('input[name=portion]:checked').val();
     //   vm.setProductsInputs(product.key);
        var inputId= '#id_popup_prod_input_'+product.key;
        var quantity = $(inputId).val();
        product["quantity"] = quantity;
        product["timestamp"] = new Date().getTime();
        dataService.updateBasket(product, $scope); 
    }

});