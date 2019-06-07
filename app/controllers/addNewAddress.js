myApp.controller('addNewAddressCtrl', function($scope, $timeout, $routeParams, dataService)
{
    var vm = this;

    vm.postalCodeValid = true;

    if($routeParams.key)
    {
        vm.key = $routeParams.key;

        var params = {};
        params["key"] = vm.key;

        vm.loading = true;
        dataService.callApi("management/api/clients/getAddresses", params , "post").then(
        function(data, response)
        {
            vm.loading = false;
            if(data.documents)
            {
              var address = data.documents[0];
              vm.street = address.street;
              vm.building = address.building;
              vm.street_number = parseInt(address.street_number);
              vm.postalCode = address.postalCode;
              vm.city = address.city;
            }
            else
            {
                dataService.showAlert("danger", "An error has occured. Please try again", "alert_msg");
            }
        },
        function(err)
        {
            vm.loading = false;
            console.log("reject", err);
            if(err.status == "success")
            {
                dataService.showAlert("success", "Your Address is updated successfully.", "alert_msg", true);
            }
            else
            {
                dataService.showAlert("danger", "An error has occured. Please try again", "alert_msg");
            }
        }); 

    }

    vm.saveAddress = function()
    {
        if(!vm.street || !vm.street_number || !vm.building || !vm.city || !vm.postalCode)
        {
            dataService.showAlert("warning", "Please fill in all required fields *.", "alert_msg");
            return;
        }

        if(!vm.postalCodeValid || vm.checkingCodeValidity)
        {
            dataService.showAlert("danger", "This postal code is not available for delivery", "alert_msg", true); 
            return;
        }

        vm.loading = true;

        var params = {};
        params["row"] = {};

        params["action"] = "add";

        if(vm.key)
        {
            params["action"]  = "edit";
            params["row"]["key"] = vm.key;
        }

        params["row"]["login"]          = JSON.parse(localStorage.userProfile).login;
        params["row"]["street"]         = vm.street;
        params["row"]["street_number"]  = vm.street_number;
        params["row"]["building"]       = vm.building;
        params["row"]["city"]           = vm.city;
        params["row"]["postalCode"]     = vm.postalCode;


        dataService.callApi("management/api/clients/getAddresses", params , "post").then(
        function(data, response)
        {
            if(data.status == 'success')
            {
               vm.loading = false; 
            //   dataService.showAlert("success", "Your Address is updated successfully.", "alert_msg", true);
               window.location.hash = '#/myAddresses';
            }
            else
            {
                vm.loading = false; 
                dataService.showAlert("danger", "An error has occured. Please try again", "alert_msg");
            }
        },
        function(err)
        {
            vm.loading = false;
            console.log("reject", err);
            if(err.status == "success")
            {
                dataService.showAlert("success", "Your Address is updated successfully.", "alert_msg", true);
            }
            else
            {
                dataService.showAlert("danger", "An error has occured. Please try again", "alert_msg");
            }
        }); 
    }

    $scope.$watch('vm.postalCode', function(newValue){
         if(newValue && newValue.length === 4){
           checkPostalCode(newValue);
         }
    });

    function checkPostalCode(postalCode)
    {
        vm.checkingCodeValidity = true;
        dataService.callApi("management/api/clients/checkPostalCode", {"code": postalCode} , "get").then(
        function(data, response)
        {
            vm.checkingCodeValidity = false;
            vm.postalCodeValid = data
            
        },
        function(err)
        {
            vm.checkingCodeValidity = false;
        }); 
    }




});

     