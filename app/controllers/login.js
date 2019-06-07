myApp.controller('loginCtrl', function($scope, dataService, auth_token) {
    
    var vm = this;

    // if($.cookie('user_token')){
    //     $location.url("/checkout")
    // }

    $scope.$emit('setUserProfile', false);

    vm.onLogin = function()
    {
        if(vm.email && vm.password)
        {
            vm.loginUser();
        }
        else
        {
            dataService.showAlert("warning", "username and password are required.", "login_alert");
        }
    }

    vm.loginUser = function(){

        var parameters = {"email" : vm.email, "password" : vm.password ,"expiry" : "8", "auth_token": auth_token};
        vm.loading = true;

        dataService.callApi("management/api/clients/login", parameters, "post", true).then(
            function(data, response)
             {
                 console.log(data);
                 if(data && data.metadata.status == "success"){ 
                    if(data.result)
                    {
                        var user_token = data.result.token;
                        $.cookie("user_token", user_token);
                        var userProfile = data.result.user;
                        localStorage.userProfile = JSON.stringify(userProfile);
                        dataService.isLoggedIn($scope);
                        window.location.hash = '#/gallery';
                    }
                    else
                    {
                        dataService.showAlert("warning", "An Error has occurred, please try again later.", "login_alert");
                        vm.loading = false;
                    }
                }
                else if(data.metadata.errorCode == "INVALID_USER")
                {
                    dataService.showAlert("warning", "INVALID USER", "login_alert");
                    vm.loading = false;
                }
                else
                {
                    dataService.showAlert("warning", "An Error has occurred, please try again later.", "login_alert");
                    vm.loading = false; 
                }
            }, function(err) {
                console.log("reject", err);
                vm.loading = false; 
                if(err.errorCode == 'INVALID_SIGNATURE')
                {
                    dataService.showAlert("warning", "INVALID USER", "login_alert");
                }
            });    

    }

    vm.register = function(){

        if(vm.firstName && vm.lastName && vm.email && vm.number && vm.password && vm.confirmPassword)
        {

            if(vm.password != vm.confirmPassword)
            {
                dataService.showAlert("warning", "Your Passwords does not match.", "register_alert");
                return;
            }
            
            var parameters = {firstName: vm.firstName, lastName: vm.lastName, email : vm.email, number : vm.number, "password" : vm.password, "expiry" : "8", "auth_token": auth_token};
            vm.loading_register = true;
            dataService.callApi("management/api/clients/register", parameters, "post", true).then(
                function(data, response)
                {
                     console.log(data);
                     if(data && data.metadata.status == "success"){ 
                        if(data.result)
                        {
                            var user_token = data.result.token;
                            $.cookie("user_token", user_token);
                            var userProfile = data.result.user;
                            localStorage.userProfile = JSON.stringify(userProfile);
                            dataService.isLoggedIn($scope);
                            window.location.hash = '#/gallery';
                        }
                        else
                        {
                            dataService.showAlert("danger", "An Error has occurred, please try again later.", "register_alert");
                            vm.loading_register = false;
                        }
                    }
                    else if(data.metadata.errorCode == "DUPLICATE_USER")
                    {
                        dataService.showAlert("danger", data.metadata.errorDetails, "register_alert");
                        vm.loading_register = false;
                    }
                    else
                    {
                        dataService.showAlert("danger", "An Error has occurred, please try again later.", "register_alert");
                        vm.loading_register = false; 
                    }
                }, function(err) {
                    console.log("reject", err);
                    vm.loading_register = false; 
                    if(err.errorCode == 'DUPLICATE_USER')
                    {
                        dataService.showAlert("danger", err.errorDetail, "register_alert");
                    }
                });   

         }
         else
         {
             dataService.showAlert("warning", "Please fill in required fields.", "register_alert");
         }    

    }

});