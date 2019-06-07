myApp.controller('lostPasswordCtrl', function($scope, dataService) {
    
    var vm = this;

    this.sendResetLink = function()
    {
        if(!vm.email)
        {
            dataService.showAlert("warning", "Please type your email.", "alert_msg");
            return;
        }

        vm.loading = true;
        var params = {login: vm.email};
        dataService.callApi("management/api/resetPassword", params, "post", true).then(
            function(data, response)
             {
                console.log(data);
                vm.loading = false;
                if(data.status == "success")
                {
                    vm.email = "";
                    dataService.showAlert("success", "We have sent you a link to your email to reset your password.", "alert_msg");
                }
                else
                {
                    dataService.showAlert("danger", "An Error has occurred, please try again later.", "alert_msg");
                    
                }
            }, function(err) {
                vm.loading = false;
                console.log("reject", err);
            });    

    }

});