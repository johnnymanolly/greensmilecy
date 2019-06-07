

myApp.controller('confirmationCtrl', function($scope, $location, $interval, $routeParams, account, time, authSig, dataService) {
    
    var vm = this;

    var promise;

    vm.account  = account;
    vm.time     = time;
    vm.authSig  = authSig;

    if(localStorage.settings)
    {
        var settings = JSON.parse(localStorage.settings);

        if(settings.deliveryTimeout)
        {
            vm.deliveryTimeout = parseInt(settings.deliveryTimeout);
        }
        else
        {
            vm.deliveryTimeout = 5;
        }
    }

    if($routeParams.orderKey && $routeParams.orderId)
    {
        vm.loading  = true;
        vm.orderKey = $routeParams.orderKey;
        var orderId = $routeParams.orderId;
        dataService.showAlert("success", "You order id #" + orderId + " has been sent. Please wait for a confirmation.", "alert_msg");
        checkOrderStatus(vm.orderKey);

    }

    vm.viewOrder = function()
    {
        //$interval.cancel(promise);
        $location.url("/viewOrder/?key="+vm.orderKey);
    }

    function checkOrderStatus(key)
    {
        var params = 
        {
            key : key
        };

        dataService.callApi("management/api/getOrder", params, "post").then(
            function(data, response)
            {               
                vm.loading = false;
                if(data.status == "success")
                {
                    vm.address   = data.details["address"]; 
                    vm.orderType = data.details["orderType"];
                }
               
                if(data.status == "success" && data.details["orderStatus"] == "Confirmed")
                {
                   vm.confirmed = true;
                   $interval.cancel(dataService.promise);
                   dataService.showAlert("success", "Your order id #" + orderId + " is approved.", "alert_msg");
                }
                else if(data.details["orderStatus"] == "Rejected")
                {

                    var rejectionDetails = JSON.parse(data.details["rejectionDetails"]);
                    vm.comments          = rejectionDetails.comments;
                    vm.editedRows        = rejectionDetails.editedRows;
                    vm.rejected          = true;
                    $interval.cancel(dataService.promise);
                    dataService.showAlert("danger", "Your order id #" + orderId + " is Rejected.", "alert_msg");
                }
                else
                {
                    if(!vm.intervalTriggered)
                    {
                        vm.intervalTriggered = true;
                        dataService.promise = $interval(function()
                        {
                            checkOrderStatus($routeParams.orderKey);

                        }, 10000);  
                    }
                    
                }
            }, 
            function(err)
            {
                vm.loading = false;
                vm.email = "";
                console.log("reject", err);
            });
    }
    
    

});