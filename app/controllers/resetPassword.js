myApp.controller('resetPasswordCtrl', function($scope, $routeParams, dataService) {
    
    var vm = this;

    this.sendResetLink = function()
    {

        if(!vm.password || !vm.confirm_password)
        {
            dataService.showAlert("warning", "Please fill in all fields.", "alert_msg");
            return;
        }

        if(vm.password != vm.confirm_password)
        {
            dataService.showAlert("warning", "Your Passwords does not match.", "alert_msg");
            return;
        }
        if($routeParams.token)
        {
            var params = {password: vm.password, token: $routeParams.token};
        }
        else
        {
            dataService.showAlert("warning", "No token found in the url.", "alert_msg");
            return; 
        }
        vm.loading = true;     
        dataService.callApi("management/api/resetPassword", params, "post", true).then(
            function(data, response)
            {
                vm.loading = false; 
                if(data.status == 'success')
                {
                   dataService.showAlert("success", "Your Password is updated successfully.", "alert_msg", true);
                   vm.password = "";
                   vm.confirm_password = "";
                }
                else
                {
                    dataService.showAlert("danger", "An error has occured. Please try again", "alert_msg");
                }
            }, function(err) {
                vm.loading = false;
                console.log("reject", err);
                if(err.status == "success"){
                    dataService.showAlert("success", "Your Password is updated successfully.", "alert_msg", true);
                }else{
                    dataService.showAlert("danger", "An error has occured. Please try again", "alert_msg");
                }
            });     

    }

});