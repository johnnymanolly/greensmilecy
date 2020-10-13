myApp.controller('productSingleCtrl', function($scope, $sce, $timeout, $routeParams, $location, account, time, authSig, initService, dataService) {

    var vm = this;
    vm.isLoggedIn = dataService.isLoggedIn($scope);

    vm.account  = account;
    vm.time     = time;
    vm.authSig  = authSig;

    getFavoriteListKeys();

    // check if basket is empty on reload and set added produts
    vm.added_products = dataService.getBasketItems();

    // Add to cart
    // vm.updateBasket = function(inputId, product)
    // {
    //     dataService.updateBasket(inputId, product, $scope); 
    // }   

    vm.showItemDesc = function(key)
    {
        $location.url("/productSingle/?key="+key);
    }

    if($routeParams.key)
    {
        getProductByKey($routeParams.key);
    }

    function getProductByKey(key)
    {

        vm.products = null;
        var params = {key: key, publishStatus: "Published"}
        dataService.getProductByKey(params).then(

            function(data, response)
            {
                if(data)
                {
                    vm.product = data;

                    vm.html = vm.product.description;
                    vm.trustedHtml = $sce.trustAsHtml(vm.html);

                    vm.images = [];
                    if(vm.product["attachments"])
                    {
                        if(typeof vm.product["attachments"] == 'string') vm.product["attachments"] = [vm.product["attachments"]];

                        if(vm.product["image"])
                        {
                            var main_img = "https://web.scriptr.io/apsdb/rest/"+vm.account+"/GetFile?apsws.time="+vm.time+"&apsws.authSig="+vm.authSig+"&apsws.responseType=json&apsws.authMode=simple&apsdb.fileName="+vm.product["image"]+"&apsdb.fieldName=attachments&apsdb.documentKey="+vm.product.key+"&apsdb.store=DefaultStore";
                            vm.images.push(main_img);
                        }

                        for(var i = 0; i < vm.product["attachments"].length; i++)
                        {
                            if(vm.product["attachments"][i] != vm.product["image"])
                            {
                                var img = "https://web.scriptr.io/apsdb/rest/"+vm.account+"/GetFile?apsws.time="+vm.time+"&apsws.authSig="+vm.authSig+"&apsws.responseType=json&apsws.authMode=simple&apsdb.fileName="+vm.product["attachments"][i]+"&apsdb.fieldName=attachments&apsdb.documentKey="+vm.product.key+"&apsdb.store=DefaultStore";
                                vm.images.push(img);
                            }

                        }

                    }
                    else
                    {
                        var img = "/images/taste-of-liberty.png";
                        vm.images.push(img);
                    }

                    var params = {subCategory: vm.product.subCategory, publishStatus: "Published"}
                    getProducts(params);

                    $timeout(function(){
                        initService.initProductSlider(vm.images);
                    }, 200);
                }
            },
            function(err)
            {
                console.log("reject", err);
            }
        );
    }

    function getProducts (params)
    {

        vm.products = null;

        dataService.getProducts(params).then(

            function(data, response)
            {
                if(data && data.documents)
                {

                    vm.products = data.documents;

                    // remove product single
                    vm.products =_.without(vm.products, _.findWhere(vm.products, {
                        key: vm.product.key
                    }));

                    $timeout(function () {
                        initService.initProducts();
                        initService.initAddProducts();
                        initService.initSlick();
                    }, 500);


                }
            },
            function(err)
            {
                console.log("reject", err);
            }
        );
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
        if(vm.isLoggedIn)
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
        else
        {
            vm.prodFavoriteKeys = [];
        }

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