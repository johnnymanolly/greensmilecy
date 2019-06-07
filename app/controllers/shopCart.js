myApp.controller('shopCartCtrl', function($scope, $timeout, $location, initService, account, time, authSig, dataService) {
    
    var vm = this;

    vm.account  = account;
    vm.time     = time;
    vm.authSig  = authSig;

    if(localStorage.settings)
    {
        var settings = JSON.parse(localStorage.settings);
        if(settings.minOrder)
        {
            vm.minOrder = parseInt(settings.minOrder);
        }
    }

    $timeout(function ()
    {
       initService.initAddProducts();
    }, 1000);

    $scope.$on('rerenderShopCartProducts', function(event, objInfo)
    {
       vm.my_basket_products_array = dataService.getBasketItemsArray();
       vm.calc_total();
    });

    vm.removeProduct = function(product)
    {
        dataService.removeProduct(product, $scope);
        vm.my_basket_products_array = [];
        vm.my_basket_products_array = dataService.getBasketItemsArray();
        vm.calc_total();
    }

    vm.showItemDesc = function(key)
    {
        $location.url("/productSingle/?key="+key);
    }

    vm.onEditProduct = function(product)
    {
        vm.selectedProduct = product;

        // loop over ingredients and render select boxes
        if(product.default_ingredients)
        {
            if(typeof product.default_ingredients == 'string') product.default_ingredients = [product.default_ingredients];
            vm.defaultIngredients =  product.default_ingredients;
             // set user default selected ingredients
            vm.defaultIngredientsFilters = angular.copy(product.default_ingredients_selected_by_user);
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
            // set user extra selected ingredients
            vm.extraIngredientsFilters = angular.copy(product.extra_ingredients_selected_by_user);
        }
        else
        {
            vm.extraIngredients = null;
        }


        $timeout(function ()
        {
            vm.comments = product.comments;
            $('#' + product.portion).prop('checked',true);
            $("textarea#comments").val(product.comments);
            angular.element('#id_popup_shop_input_'+product.key).val(product.quantity);
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

    vm.emptyBasket = function()
    {
        dataService.emptyBasket($scope);
        vm.my_basket_products_array = dataService.getBasketItemsArray();
        vm.calc_total();
    }

    vm.editProduct = function(product, input_id)
    {

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


        if($('input[name=portion]:checked'))
        {
            product["portion"] = $('input[name=portion]:checked').val();
        }
   
        var inputId = '#'+input_id+product.key;
        var quantity = $(inputId).val();
        product["quantity"] = quantity;

        dataService.editProduct(product, $scope); 
        vm.calc_total();
    }

    vm.updateQuantity = function(product, input_id)
    {
        var inputId = '#'+input_id+product.key;
        var quantity = $(inputId).val();
        product["quantity"] = quantity;
        dataService.editProduct(product, $scope); 
        vm.calc_total();
    }

    vm.calc_total = function()
    {
        var total = dataService.calc_total($scope);
        vm.total_amount  = total.total_amount;
        vm.items_counter = total.items_counter;

        if(vm.my_basket_products_array.length == 0)
        {
            vm.isBasketEmpty = true;
        }
    }

    vm.checkout = function()
    {
        if(vm.total_amount < vm.minOrder)
        {
            dataService.showAlert("warning", "The minimum order is €" + vm.minOrder, "alert_msg");
            return;
        }

        $location.url("/checkout");
    }

    vm.my_basket_products_array = dataService.getBasketItemsArray();

    vm.calc_total();

});