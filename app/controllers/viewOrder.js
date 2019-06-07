myApp.controller('viewOrderCtrl', function($scope, $routeParams, $interval, dataService, account, time, authSig) {
    var vm = this;

    var promise;

    vm.account  = account;
    vm.time     = time;
    vm.authSig  = authSig;

    if($routeParams.key)
    {
        vm.loading = true;
        checkOrderStatus($routeParams.key)
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
                if(data.status == "success" && data.documents)
                {
                   vm.products       = data.documents;
                   vm.total_amount   = data.details.total;
                   vm.sub_total      = data.details.sub_total;
                   vm.total_items    = data.details.total_items;
                   vm.orderType      = data.details.orderType;
                   vm.payment_method = data.details.payment_method;
                   vm.address        = data.details.address;
                   vm.orderStatus    = data.details.orderStatus;
                   vm.fullName       = data.details.fullName;
                   vm.number         = data.details.number;
                   vm.deliveryDate   = new Date(data.details.deliveryDate).toLocaleString();
                   vm.orderedDate   = new Date(data.details.orderedDate).toLocaleString();
                   vm.orderId        = data.details.orderId;
                   vm.deliveryFee    = data.details.deliveryFee;

                   if(data.details.orderStatus != "Confirmed" && data.details.orderStatus != "Rejected" && data.details.orderStatus != "Timeout")
                   {
                        if(!vm.intervalTriggered)
                        {
                            vm.intervalTriggered = true;
                            dataService.promise = $interval(function()
                            {
                                checkOrderStatus($routeParams.key);

                            }, 10000);   
                        }
                   }
                   else if (data.details.orderStatus == "Rejected")
                   {
                        $interval.cancel(dataService.promise);
                        var rejectionDetails = JSON.parse(data.details["rejectionDetails"]);
                        vm.comments          = rejectionDetails.comments;
                        vm.editedRows        = rejectionDetails.editedRows;
                        for(var i = 0; i < vm.editedRows.length; i++)
                        {
                          var key = vm.editedRows[i].key;
                          var index = _.findIndex(vm.products, function(voteItem)
                          { 
                            return voteItem.key == key 
                          })
                          vm.products[index]["availableQuantity"] = vm.editedRows[i]["availableQuantity"];
                          vm.products[index]["rejection_comments"] = vm.editedRows[i]["rejection_comments"];
                        }
                   }
                   else
                   {
                        $interval.cancel(dataService.promise);
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