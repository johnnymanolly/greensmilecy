myApp.controller('contactUsCtrl', function($scope, dataService) {
    
    var vm = this;

    vm.sendMessage = function()
    {
        if(!vm.email || !vm.message)
        {
            dataService.showAlert("warning", "Please fill in required fields.", "alert_msg");
            return;
        }
        
        var params = {
            email : vm.email,
            fullName : vm.fullName,
            address : vm.address,
            number : vm.number,
            message: vm.message
        };

        vm.loading = true;
        dataService.callApi("management/api/sendMessage", params, "post", true).then(
            function(data, response)
            {
                vm.loading = false;
                vm.email = "";
                vm.fullName = "";
                vm.address = "";
                vm.number = "";
                vm.message = "";
                if(data.status == "success")
                {
                   dataService.showAlert("success", "Thank you for contacting us. We will reply to you shortly.", "alert_msg");
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