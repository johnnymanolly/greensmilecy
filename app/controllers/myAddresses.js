myApp.controller('myAddressesCtrl', function($scope) {

    var vm = this;

    vm.loading = true;

    vm.gridParams = {login: JSON.parse(localStorage.userProfile).login};
    vm.addParams = {login: JSON.parse(localStorage.userProfile).login, formType : 'address'};
    vm.myAddressesColDef = [
     
        {headerName: "Street", field: "street"},
        {headerName: "Street Number", field: "street_number"},
        {headerName: "Building", field: "building"},
        {headerName: "Postal Code", field: "postalCode"},
        {headerName: "city", field: "city"}  ,
        {headerName: "Edit", editable : false, cellRenderer: function (params) { 
            return vm.editCellRenderer(params);

        }}               
    ];

    vm.defaultCellRenderer = function(params){
        if(params.value){
            return '<span class="ag-cell-inner" tooltip-placement="auto" uib-tooltip="'+ params.value +'">'+params.value+'</span>'
        }else{
            return ''
        }
    }

    vm.editCellRenderer = function(params)
    {
        if(params.data)
        {
            var data = '?key='+params.data.key;

            return '<div class="ag-cell-inner"><span><a href="#/addNewAddress'+data+'"><i class="fa fa-edit"></i> Edit</a></span></div>';  
        }

    }

    vm.onAddRowClick = function()
    {
        window.location.hash = '#/addNewAddress';
    }

    vm.onAddressesLoaded = function(data)
    {
        vm.loading = false;
        if(data.documents.length > 0)
        {
            vm.addressesList = true;
        }
        else
        {
            vm.addressesList = false;
        }
        return data;
    }
});
