myApp.controller('checkoutCtrl', function($scope, $timeout, $location, initService, auth_token, dataService) {
    
    var vm = this;

    vm.postalCodeValid = true;

    vm.isLoggedIn = dataService.isLoggedIn($scope);

    $timeout(function()
    {
        initService.initSelect();
        initService.initShowHidePanel();
        initService.initDatePickers(vm.isLoggedIn);

    }, 200);

    if(localStorage.settings)
    {
        var settings = JSON.parse(localStorage.settings);

        if(settings.deliveryEnabled == "true")
        {
            vm.deliveryEnabled = true;
            vm.type = "delivery";
        }
        else
        {
            vm.deliveryEnabled = false;
            if(settings.takeawayEnabled == "true")
            {
                vm.takeawayEnabled = true;
                vm.type = "takeaway";
            }
        }

        if(settings.onlinePayment == "true")
        {
            vm.onlinePayment = true;
        }
        else
        {
            vm.onlinePayment = false;
        }

        if(settings.minOrder)
        {
            vm.minOrder = parseFloat(settings.minOrder);
        }

        if(settings.deliveryTime)
        {
            vm.deliveryTime = parseInt(settings.deliveryTime);
        }

        if(settings.deliveryFee)
        {
            vm.deliveryFee = parseFloat(settings.deliveryFee);
        }

        if(settings.takeawayTime)
        {
            vm.takeawayTime = parseInt(settings.takeawayTime);
        }
    }

    // vm.loadingSettings = true;
    // dataService.callApi("management/api/settings", params , "post").then(
    // function(data, response)
    // {
    //     vm.loadingSettings = false;
    //     if(data.documents)
    //     {
    //         if(data.documents[0].deliveryEnabled == "true")
    //         {
    //             vm.deliveryEnabled = true;
    //             vm.type = "delivery";
    //         }
    //         else
    //         {
    //             vm.deliveryEnabled = false;
    //             vm.type = "takeaway";
    //         }

    //         $timeout(function()
    //         {
    //             initService.initSelect();
    //             initService.initShowHidePanel();
    //             initService.initDatePickers(vm.isLoggedIn);

    //         }, 200);
    //     }
        
    // },
    // function(err)
    // {
    //     vm.loadingSettings = false;
    //     console.log("reject", err);
    // }); 

    vm.calc_total = function()
    {
        var total = dataService.calc_total($scope);
        vm.total_amount  = total.total_amount;
        vm.items_counter = total.items_counter;
    }

    vm.my_basket_products_array = dataService.getBasketItemsArray();
    vm.calc_total();

    $scope.$on('rerenderPlaceOrderProductsList', function(event, objInfo)
    {
       vm.my_basket_products_array = dataService.getBasketItemsArray();
       vm.calc_total();
    });

    if(vm.isLoggedIn)
    {
        setUserInfoFields();

        var params =
        {
            login : JSON.parse(localStorage.userProfile).login
        }

        getAddresses(params);  
    }

    function setUserInfoFields()
    {
        vm.firstName = JSON.parse(localStorage.userProfile).firstName;
        vm.lastName = JSON.parse(localStorage.userProfile).lastName;
        vm.number = JSON.parse(localStorage.userProfile).number;
        vm.email = JSON.parse(localStorage.userProfile).email;
    }

    function getAddresses(params)
    {
        dataService.getAddresses(params).then(

        function(data, response)
        {
            if(data && data.documents)
            {
               vm.addresses = data.documents;
               if(data.documents.length > 0)
               {
                  vm.postalCode = data.documents[data.documents.length-1]["postalCode"]; // wached not working
                  checkPostalCode(vm.postalCode);
                  vm.new_address = false;  
               }
               else
               {
                vm.new_address = true;
               }
            }
        },
        function(err)
        {
            console.log("reject", err);
        }
        ); 
    }

    vm.onAddressSelect = function(address)
    {
        if(address == "new")
        {
            vm.new_address = true;
        }
        else
        {
            vm.new_address = false;
            address = JSON.parse(address);
            vm.street = address.street;
            vm.street = address.street_number;
            vm.building = address.building;
            vm.postalCode = address.postalCode; //wached
            vm.city = address.city;
        }

    }

    vm.onLogin = function()
    {
        if(vm.email && vm.password)
        {
            vm.loginUser();
        }
        else
        {
            dataService.showAlert("warning", "username and password are required.", "alert_msg");
        }
    }

    vm.loginUser = function()
    {

        var parameters = {"email" : vm.email, "password" : vm.password ,"expiry" : "8", "auth_token": auth_token};
        vm.loading = true;

        dataService.callApi("management/api/clients/login", parameters, "post", true).then(
            function(data, response)
             {
                 console.log(data);
                 if(data.metadata.status == "success"){ 
                    if(data.result)
                    {
                        vm.loading = false;
                        var user_token = data.result.token;
                        $.cookie("user_token", user_token);
                        var userProfile = data.result.user;
                        localStorage.userProfile = JSON.stringify(userProfile);
                        vm.isLoggedIn = dataService.isLoggedIn($scope);
                        setUserInfoFields();
                        var params =
                        {
                            login : JSON.parse(localStorage.userProfile).login
                        }
                        initService.initDatePickers(vm.isLoggedIn);
                        getAddresses(params);
                    //    window.location.hash = '#/checkout';
                    }
                    else
                    {
                        dataService.showAlert("danger", "An Error has occurred, please try again later.", "alert_msg");
                        vm.loading = false;
                    }
                }
                else if(data.metadata.errorCode == "INVALID_USER")
                {
                    dataService.showAlert("danger", "INVALID USER", "alert_msg");
                    vm.loading = false;
                }
                else
                {
                    dataService.showAlert("danger", "An Error has occurred, please try again later.", "alert_msg");
                    vm.loading = false; 
                }
            }, function(err) {
                console.log("reject", err);
            });    

    }

    vm.sendOrder = function()
    {  
        if(vm.checkingPostalCode)
        {
            return;
        }

        var build = buildParams();
        if(!build)
        {
           return;
        }

        vm.loading = true;
        dataService.callApi("management/api/sendOrder", vm.params, "post", true).then(
            function(data, response) {
                if(data.status == "success")
                {
                    //   vm.products = data.documents;
                    dataService.emptyBasket($scope);
                    vm.loading = false;
                    var key = data.orderKey;
                    var orderId = data.orderId;
                 //   $location.url("/confirmation?orderKey="+key+"&orderId="+orderId); 
                    $location.url("/viewOrder?key="+key); 
                }
                else
                {
                     vm.loading = false;
                     var message = data.message;
                     dataService.showAlert("warning", message, "alert_msg");
                     return;
                }
            }, function(err) {
                vm.loading = false;
                console.log("reject", err);
            }); 
    }

    function buildParams()
    {

        vm.params = {};

        if(dataService.getBasketItemsArray().length == 0)
        {
            dataService.showAlert("warning", "Your cart is empty", "alert_msg");
            return;
        }

        if(vm.type == "delivery" && vm.total_amount < vm.minOrder)
        {
            dataService.showAlert("warning", "The minimum order is €" + vm.minOrder, "alert_msg");
            return;
        }

        if(!vm.postalCodeValid)
        {
            dataService.showAlert("danger", "This postal code is not available for delivery", "alert_msg", true); 
            return;
        }

        if(!vm.deliveryEnabled && !vm.takeawayEnabled)
        {
            dataService.showAlert("danger", "Service is currently unavailable", "alert_msg", true); 
            return;
        }

        if(vm.isLoggedIn)
        {

            vm.params["login"] = JSON.parse(localStorage.userProfile).login;
            vm.params["number"] = JSON.parse(localStorage.userProfile).number;
            vm.params["fullName"] = JSON.parse(localStorage.userProfile).name;   

            if(vm.type == 'delivery')
            {
                if(!vm.new_address)
                {
                    var e = document.getElementById("addresses_list");
                    var strUser = e.options[e.selectedIndex].value;
                    var addressObj = JSON.parse(strUser);
                    vm.params["address"] = addressObj.street + " " + addressObj.street_number + " " + addressObj.building + ", " + addressObj.city + ", " + addressObj.postalCode;
                }
                else
                {
                    if(!vm.street || !vm.street_number || !vm.building || !vm.city || !vm.postalCode)
                    {
                        dataService.showAlert("warning", "Please fill in all required fields *.", "alert_msg");
                        window.scrollTo(0,0);
                        return false;
                    }
                    vm.params["address"] = vm.street + " " + vm.street_number + " " + vm.building + ", " + vm.city + ", " + vm.postalCode;
                }   
            }  
        }
        else
        {

            if(!vm.firstName || !vm.lastName || !vm.number || !vm.email)
            {
                dataService.showAlert("warning", "Please fill in all required fields *.", "alert_msg");
                window.scrollTo(0,0);
                return false;
            }

            vm.params["login"] = vm.email;
            vm.params["number"] = vm.number;
            vm.params["fullName"] = vm.firstName + " " + vm.lastName;
            
            if(vm.type == 'delivery')
            {
                if(!vm.street || !vm.street_number || !vm.building || !vm.city || !vm.postalCode)
                {
                    dataService.showAlert("warning", "Please fill in all required fields *.", "alert_msg");
                    window.scrollTo(0,0);
                    return false;
                }

                vm.params["address"] = vm.street + " " + vm.street_number + " " + vm.building + ", " + vm.city + ", " + vm.postalCode;
            }

        }

        if(vm.additionalInformation)
        {
            vm.params["additionalInformation"] = vm.additionalInformation;
        }

        if(vm.company)
        {
           vm.params["company"] = vm.company; 
        }

        if(vm.coupon)
        {
           vm.params["coupon"] = vm.coupon; 
        }

        vm.params["sub_total"]      = vm.total_amount;
        vm.params["total"]          = vm.total_amount + parseFloat(vm.deliveryFee.toFixed(2));
        vm.params["total_items"]    = vm.items_counter;
        vm.params["deliveryFee"]    = parseFloat(vm.deliveryFee.toFixed(2));
        vm.params["payment_method"] = "Cash";
        vm.params["orderType"]      = vm.type;
        vm.params["items"]          = cleanParams(dataService.getBasketItemsArray());
    //    vm.params["orderedDate"]  = moment(new Date).format('YYYY-MM-DDTHH:mm:ss+0000');

        if(vm.isLoggedIn)
        {
            var datepicker = $( "#datepicker_logged_in" ).val();
            var timepicker = $( "#timepicker_logged_in" ).val();
        }
        else
        {
            var datepicker = $( "#datepicker_logged_out" ).val();
            var timepicker = $( "#timepicker_logged_out" ).val();
        }
        

        var scheduledDate = datepicker + " " + timepicker;
        scheduledDate = new Date(scheduledDate);
   //     scheduledDate = moment(scheduledDate).format('YYYY-MM-DDTHH:mm:ss+0000');

        vm.params["orderTime"]    = timepicker;
        vm.params["deliveryDate"] = scheduledDate;

        return true;

    }

    $scope.$watch('vm.postalCode', function(newValue)
    {
         if(newValue && newValue.length === 4)
         {
           checkPostalCode(newValue);
         }
    });

    $scope.$watch('vm.type', function(newValue)
    {
         if(newValue === 'delivery')
         {
           initService.initSelect();
         }
    });

    function checkPostalCode(postalCode)
    {
        vm.checkingPostalCode = true;
        vm.postalCodeValid = false;
        dataService.callApi("management/api/clients/checkPostalCode", {"code": postalCode} , "get").then(
        function(data, response)
        {
            vm.checkingPostalCode = false;
            if(data)
            {
                vm.postalCodeValid = true;
                if(data.minOrder)
                {
                    vm.minOrder = Number(data.minOrder);
                }
                else
                {
                    vm.minOrder = parseFloat(settings.minOrder);
                }

                if(data.deliveryFee)
                {
                    vm.deliveryFee = Number(data.deliveryFee);
                }
                else
                {
                    vm.deliveryFee = parseFloat(settings.deliveryFee);
                }

            }
            else
            {
                vm.postalCodeValid = false;
            }
            
            
        },
        function(err)
        {
            vm.checkingPostalCode = false;
        }); 
    }

    function cleanParams(items)
    {
        var array = [];
        for(var i = 0; i < items.length; i++)
        {
            var obj = {};

            obj["key"] = items[i]["key"];
            obj["name"] = items[i]["name"];
            obj["quantity"] = items[i]["quantity"];
            obj["subCategory"] = items[i]["subCategory"];

            
            if(items[i]["portion"] && items[i]["portion"] == "half")
            {
                obj["price"] = items[i]["halfPortionPrice"];
            }
            else
            {
                obj["price"] = items[i]["price"];
            }

            if(items[i]["ingredients"])
            {
                obj["ingredients"] = items[i]["ingredients"].toString();
            }

            if(items[i]["portion"])
            {
                obj["portion"] = items[i]["portion"];
            }

            if(items[i]["comments"])
            {
                obj["comments"] = items[i]["comments"];
            }

            if(items[i]["image"])
            {
                obj["image"] = items[i]["image"];
            }
            
            array.push(obj);

        }
        return JSON.stringify(array);
    }


});