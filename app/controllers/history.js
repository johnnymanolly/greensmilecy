myApp.controller('historyCtrl', function($scope, $timeout, $routeParams, initService, dataService) {
    
    var vm = this;

    vm.loading = true;

    vm.gridParams = vm.gridParams = {login: JSON.parse(localStorage.userProfile).login};

    vm.historyColDef = [
        {headerName: "Order Id", field: "orderId"},  
        // {headerName: "Device Id", field: "deliveredBy", hide: true},  
        {headerName: "Ordered Date", field: "orderedDate", cellRenderer: function (params) {  
            return vm.dateRenderer(params);
        }},
        {headerName: "Delivery Date", field: "deliveryDate", cellRenderer: function (params) {  
            return vm.dateRenderer(params);
        }},
        {headerName: "Name", field: "fullName"},
        {headerName: "Address", field: "address"},
        {headerName: "Total", field: "total"},
        {headerName: "Comments", field: "additionalInformation"},
        {headerName: "Status", field: "orderStatus", cellRenderer: function (params) {  
            return vm.statusRenderer(params);
        }},
        {headerName: "Order", editable : false, cellRenderer: function (params) {  
            return vm.viewOrder(params);
        }},
        // {headerName: "Track Order", editable : false, cellRenderer: function (params) {  
        //     return vm.trackOrder(params);
        // }}
    ];

    vm.statusRenderer  = function(params){
        if(params.value == "Pending.." || params.value == "Assigned" )
        {
             return '<div class="ag-cell-inner"><i class="fa fa-spinner fa-spin fa-1x" style="margin-right:5px;"></i><span style="color:red;">Pending.. </span></div>' 
        }
        else if(params.value != "Confirmed" && params.value != "Delivered")
        {
             return '<div class="ag-cell-inner" style="color:red;font-weight:bold;">'+params.value+'</div>' 
        }
        else
        {
             return '<div class="ag-cell-inner" style="color:green;font-weight:bold;">'+params.value+'</div>' 
        }
       
    }

    vm.trackOrder  = function(params)
    {
        if(params.data)
        {
            if(params.data.orderStatus == "Confirmed" && params.data.deliveredBy){
                 return '<div class="ag-cell-inner"><a href="#/trackOrder/?deviceId='+params.data.deliveredBy.split("-")[1]+'&key='+params.data.key+'">Track Order</a></div>' 
            }else{
                 return '<button tooltip-placement="auto" uib-tooltip="Tracking mode is not available at this moment." class="confirm-order set-dis-pos disabled">Track</button>'
            }
        }   
    }

    vm.viewOrder  = function(params)
    {
        if(params.data)
        {
            return '<div class="ag-cell-inner"><a href="#/viewOrder/?key='+params.data.key+'">View Order</a></div>';
        }
    }

    vm.defaultCellRenderer = function(params){
        if(params.value){
            return '<span class="ag-cell-inner" tooltip-placement="auto" uib-tooltip="'+ params.value +'">'+params.value+'</span>'
        }else{
            return ''
        }
    }

    vm.dateRenderer = function(params){
        if(params.value){
            var orderDate = new Date(params.value).toLocaleString();
            return '<span class="ag-cell-inner" tooltip-placement="auto" uib-tooltip="'+ orderDate +'">'+orderDate+'</span>'
        }else{
            return "";
        }
    }

    vm.onHistoryLoaded = function(data)
    {
        vm.loading = false;
        if($routeParams.order && !vm.msg_showed)
        {
            vm.msg_showed = true;
            dataService.showAlert("success", "You order has been sent. Please wait for a confirmation.", "alert_msg", true, 20000);
        }
        if(data.documents.length > 0)
        {
            vm.historyList = true;
        }
        else
        {
            vm.historyList = false;
        }
        return data;
    }



});