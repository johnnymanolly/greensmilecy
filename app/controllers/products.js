myApp.controller('productsCtrl', function($scope, $routeParams, $location, $timeout, $uibModal, initService, account, time, authSig, dataService, resultsPerPage) {
    
    var vm = this;

    if(localStorage.settings)
    {
        vm.hidePhotos = JSON.parse(localStorage.settings).hidePhotos;
    }
    

    vm.account = account;
    vm.time = time;
    vm.authSig = authSig;
    
    initService.initSelect();

    vm.gridMode = true;

    vm.resultsPerPage = resultsPerPage;
    vm.pageNumber = 1;

    vm.isLoggedIn = dataService.isLoggedIn($scope);

    getFavoriteListKeys();
 
    if($routeParams.catKey)
    {
        vm.catKey = $routeParams.catKey;
    }  

    getCategories();

    // Filters
    vm.filteredSubCats = {
        cats: []
    };

    $scope.$on('$viewContentLoaded', function(angularEvent, next, current) { 

        var elmnt = document.getElementById("productsId");
        elmnt.scrollIntoView();

    });

    // set Filter if page is reloaded
    if($location.$$url.indexOf("subCat") != -1)
    {
        vm.filteredSubCats.cats = getsubCatsFromURL();
    }

    // check if basket is empty on reload and set added produts
    vm.added_products = dataService.getBasketItems();

    $scope.$on('updateProductsInputs', function(event, objInfo)
    {
       vm.my_basket_products_array = dataService.getBasketItemsArray();
    });

    vm.showItemDesc = function(key)
    {
        $location.url("/productSingle/?key="+key);
    }

    function getsubCatsFromURL()
    {
        var string = $location.$$url;
        string = string.split("?")[1];
        string = string.split("&");
        var checkedFilters = [];

        for(var i = 0; i < string.length; i++)
        {
            checkedFilters.push(string[i].split("=")[1]);
        }

        return checkedFilters;
    }

    function getCategories()
    {
        dataService.getCategories().then(
        function(data, response) {
            vm.categories = data;
            if(vm.categories.length > 0)
            {
                if(vm.catKey)
                {
                    vm.selectedSubCat = _.where(data, {key: vm.catKey})[0]["name"];
                }
                else
                {
                    vm.selectedSubCat = "All";
                }
                
                var params = {publishStatus: "Published", resultsPerPage: resultsPerPage};
                if(vm.catKey)
                {
                    params["catKey"] = vm.catKey;
                }
                getProducts(params);
            }
            else
            {
                vm.products = [];
            }
            $timeout(function()
            {
                initService.initGallery();  
            }, 1000);
        },
        function(err) {
            console.log("reject", err);
        }
    ); 
    }

    function getSubCats (params){

        dataService.getSubCats(params).then(
        function(data, response)
        {
            vm.selectedCat = data.name;
            vm.categories = data;
            vm.subCategories = vm.categories.subCats;
            if(typeof vm.subCategories == 'string') vm.subCategories = [vm.subCategories];

            var params = {catKey: $routeParams.catKey, publishStatus: "Published", resultsPerPage: resultsPerPage};
            getProducts(params);

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
                    
                    calculatePaginations(data);
                    vm.products = data.documents;
                        if(!vm.initProducts)
                       {
                            $timeout(function () 
                            {
                               vm.initProducts = true;
                               initService.initProducts();
                               initService.initAddProducts();
                            }, 1000);
                       }
                }
            },
            function(err)
            {
                console.log("reject", err);
            }
        );        
    }

    function calculatePaginations(data)
    {
        var resultsPerPage = parseInt(vm.resultsPerPage);

        vm.productsCount = parseInt(data.count);
        vm.displayedProductsCount = data.documents.length;
        vm.paginations = Math.ceil(data.count / resultsPerPage);

        if(vm.pageNumber == 1)
        {
            vm.fromProductNumber = 1;
            vm.toProductNumber = vm.displayedProductsCount;
        }
        else
        {
           vm.fromProductNumber = (resultsPerPage * vm.pageNumber) - resultsPerPage;
           vm.toProductNumber = vm.fromProductNumber + vm.displayedProductsCount;
        }

        setPageNumber();
    }

    vm.filterProductByPrice = function()
    {
        vm.pageNumber = 1;
        vm.fromValue = Number($('#value-lower').html());
        vm.toValue = Number($('#value-upper').html());

        var params = {};
        params["subCategory"] = vm.filteredSubCats.cats;
        params["catKey"] = $routeParams.catKey;
        params["resultsPerPage"] = resultsPerPage;
        params["publishStatus"] = "Published";
        params["fromValue"] = vm.fromValue;
        params["pageNumber"] = vm.pageNumber;
        params["toValue"] = vm.toValue;

        getProducts(params);
    }

    vm.getProductsByPage = function(pageNumber)
    {
        vm.pageNumber = pageNumber;

        setPageNumber();

        var params = {};
        params["subCategory"] = vm.filteredSubCats.cats;
        params["catKey"] = $routeParams.catKey;
        params["resultsPerPage"] = resultsPerPage;
        params["pageNumber"] = vm.pageNumber;
        params["publishStatus"] = "Published";

        if(vm.fromValue) params["fromValue"] = vm.fromValue;
        if(vm.toValue) params["toValue"] = vm.toValue;



        getProducts(params);
        window.scrollTo(0,0);

    }

    function setPageNumber()
    {
        for(var i = 1; i <= vm.paginations; i++)
        {
           angular.element('#page_'+i).removeClass("active-pagi1");  
        }

        angular.element('#page_'+vm.pageNumber).addClass("active-pagi1");
    }

    vm.onFilterClicked = function()
    {

        vm.pageNumber = 1;
        vm.filterMode = true;
        vm.selectedSubCat = "Filtered Products";

        var params = {};

        params["subCategory"] = vm.filteredSubCats.cats;
    //    params["catKey"] = $routeParams.catKey;
        params["resultsPerPage"] = resultsPerPage;
        params["pageNumber"] = vm.pageNumber;
        params["publishStatus"] = "Published";

        if(vm.fromValue) params["fromValue"] = vm.fromValue;
        if(vm.toValue) params["toValue"] = vm.toValue;
        
        getProducts(params);

    }

    vm.searchProduct = function(product){
        
        vm.pageNumber = 1;
        vm.filterMode = true;
        vm.selectedSubCat = "Filtered Products";

        var params = {};

        params["subCategory"] = vm.filteredSubCats.cats;
        params["catKey"] = $routeParams.catKey;
        params["queryFilter"] = product;
        params["resultsPerPage"] = resultsPerPage;
        params["publishStatus"] = "Published";

        getProducts(params);
    }

    vm.onCategoryClicked = function(cat)
    {

        vm.pageNumber = 1;
        vm.filterMode = true;

        var params = {};

        vm.filteredSubCats.cats = [];

   //     params["subCategory"] = vm.filteredSubCats.cats;
        if(cat != 'all')
        {
           vm.selectedSubCat = cat["name"];
           params["catKey"] = cat.key;  
        }
        else
        {
           $location.url("/products?");
        }
       
        params["resultsPerPage"] = resultsPerPage;
        params["pageNumber"] = vm.pageNumber;
        params["publishStatus"] = "Published";

        if(vm.fromValue) params["fromValue"] = vm.fromValue;
        if(vm.toValue) params["toValue"] = vm.toValue;
        
        getProducts(params, true);

    }

    vm.onSortProducts = function(){

        vm.pageNumber = 1;
        var params = {};
        params["subCategory"] = vm.filteredSubCats.cats;
        params["catKey"] = $routeParams.catKey;
        params["sortingFilter"] = vm.sort_type;
        params["resultsPerPage"] = resultsPerPage;
        params["publishStatus"] = "Published";
        params["pageNumber"] = vm.pageNumber;

        if(vm.fromValue) params["fromValue"] = vm.fromValue;
        if(vm.toValue) params["toValue"] = vm.toValue;

        getProducts(params);
    }

    vm.setProductsInputs = function(key)
    {
        if(vm.gridMode)
        {
             var quantity = parseInt(angular.element('#id_grid_prod_input_'+key).val());
             angular.element('#id_list_prod_input_'+key).val(quantity);
        }
        if(vm.listMode)
        {
             var quantity = parseInt(angular.element('#id_list_prod_input_'+key).val());
             angular.element('#id_grid_prod_input_'+key).val(quantity);
        }
    }

    vm.addToFavorites = function(key)
    {
        var params = {};
     //   params["login"] = JSON.parse(localStorage.userProfile).login;
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
            params["return_keys"] = true;
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

    if($routeParams.search)
    {
        vm.searchProduct($routeParams.search);
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


myApp.controller('customizeModalCtrl', function($scope, $routeParams, $uibModalInstance) {
    
    var vm = this;   
    
    vm.formatData = function(data)
    {
        var rejectionDetails = JSON.parse(data.details.rejectionDetails);
        if(rejectionDetails.comments)
        {
            $scope.comments = rejectionDetails.comments;
        }
        return {documents : rejectionDetails.editedRows};
    }

    $scope.ok = function()
    {
        $uibModalInstance.dismiss();
    }

});