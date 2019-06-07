myApp.controller('promotionsCtrl', function($scope, $timeout, $location, initService, account, time, authSig, dataService) {
    
    var vm = this;

    vm.account = account;
    vm.time = time;
    vm.authSig = authSig;
    
    initService.initGallery();
    initService.initSelect();
    initService.initCountDown();

    vm.isLoggedIn = dataService.isLoggedIn($scope);

    if(vm.isLoggedIn)
    {
       getFavoriteListKeys();  
    }

    // check if basket is empty on reload and set added produts
    vm.added_products = dataService.getBasketItems();

    // $scope.$on('updatePromotionProductsInputs', function(event, objInfo)
    // {
    //    vm.my_basket_products_array = dataService.getBasketItemsArray();
    // });

    vm.showItemDesc = function(key)
    {
        $location.url("/productSingle/?key="+key);
    }


    var params = {
        promotion: "true",
        publishStatus: "Published",
    }
    getProducts(params);

    function getProducts (params)
    {

        vm.products = null;

        dataService.getProducts(params).then(

            function(data, response)
            {
                if(data && data.documents)
                {
                    
                    vm.products = data.documents;

                    if(vm.products.length > 0)
                    {
                        $timeout(function () 
                        {
                               initService.initSlick();
                               initService.initProducts();
                               initService.initAddProducts();
                               vm.showProducts = true;
                            }, 10);
                    }
                   
                }
            },
            function(err)
            {
                console.log("reject", err);
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
        var inputId= '#id_popup_offer_input_'+product.key;
        var quantity = $(inputId).val();
        product["quantity"] = quantity;
        product["timestamp"] = new Date().getTime();
        dataService.updateBasket(product, $scope); 
    }

    vm.addToFavorites = function(key)
    {
        var params = {};
//        params["login"] = JSON.parse(localStorage.userProfile).login;
        params["action"] = "add";
        params["key"] = key;

        dataService.addToFavorites(params).then(

            function(data, response)
            {
                if(data)
                {
                    console.log("Item added to wishlist");
                    getFavoriteListKeys();
                }
            },
            function(err)
            {
                console.log("reject", err);
            }
        );     
    }

    vm.removeProdutFromWishList = function(key)
    {
        removeProdutFromWishList(key);
    }

    function removeProdutFromWishList(key)
    {
        var params = {};
//        params["login"] = JSON.parse(localStorage.userProfile).login;
        params["action"] = "delete";
        params["keys"] = key;

        vm.loading = true;
        dataService.addToFavorites(params).then(

            function(data, response)
            {
                if(data)
                {
                    getFavoriteListKeys();
                }
            },
            function(err)
            {
                console.log("reject", err);
                vm.loading = false;
            }
        );     
    }

    vm.inFavorites = function(key)
    {
        if(_.contains(vm.prodFavoriteKeys, key))
        {
           return true;
        }
        else
        {
           return false; 
        }
        
    }

    function getFavoriteListKeys()
    {
        var params = {};
        params["login"] = JSON.parse(localStorage.userProfile).login;

        dataService.getFavoriteListKeys(params).then(

            function(data, response)
            {
                if(data)
                {
                    console.log(data.documents);
                    vm.prodFavoriteKeys = data;
                }
            },
            function(err)
            {
                console.log("reject", err);
            }
        );     
    }

    vm.addRemoveProdWishList = function (key)
    {
        if(_.contains(vm.prodFavoriteKeys, key))
        {
           removeProdutFromWishList(key);
        }
        else
        {
           vm.addToFavorites(key); 
        }

    }


});