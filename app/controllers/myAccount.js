myApp.controller('myAccountCtrl', function($scope, dataService, $timeout) {
    
    var vm = this;

    vm.first_name = JSON.parse(localStorage.userProfile).firstName;
    vm.last_name = JSON.parse(localStorage.userProfile).lastName;
    vm.number = JSON.parse(localStorage.userProfile).number;
    vm.email = JSON.parse(localStorage.userProfile).email;

    vm.submit = function(form){
        
        var params = vm.accountModel;
        if(vm.first_name && vm.last_name && vm.email && vm.number)
        {

            if(vm.new_pw && vm.new_pw != vm.confirm_pw)
            {
                dataService.showAlert("warning", "Your Passwords does not match.", "alert_msg");
                return;
            }

            var params = {
                firstName: vm.first_name,
                lastName: vm.last_name,
                email: vm.email,
                number: vm.number,
                password: vm.confirm_pw
            };

            vm.loading = true;
            dataService.callApi("management/api/clients/updateUser", params, "post", true).then(
            function(data, response) {
                window.scrollTo(0,0);
                if(data.status == 'success'){
                   vm.loading = false; 
                   dataService.showAlert("success", "Your Profile is updated successfully.", "alert_msg", true);
                   localStorage.userProfile = JSON.stringify(data.user);
                   dataService.isLoggedIn($scope);
                }
                else
                {
                    vm.loading = false; 
                    dataService.showAlert("danger", "An error has occured. Please try again", "alert_msg");
                }
            }, function(err) {
                vm.loading = false;
                console.log("reject", err);
                if(err.status == "success"){
                    dataService.showAlert("success", "Your Profile is updated successfully.", "alert_msg", true);
                }else{
                    dataService.showAlert("danger", "An error has occured. Please try again", "alert_msg");
                }
            }); 

        }
        else
        {
            dataService.showAlert("warning", "Please fill in all required fields *.", "alert_msg");
            window.scrollTo(0,0);
        }
        
    }

});