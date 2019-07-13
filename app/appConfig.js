var domain = "greensmilecy";

var httpsConfig = ["httpClientProvider",function (httpClientProvider) {
  httpClientProvider.setBaseUrl("https://" + domain + ".scriptrapps.io");
  httpClientProvider.setType("user");
 // httpClientProvider.setToken("UEYzNUVERTI0QzpzY3JpcHRyOkQ1MUE2ODI5ODNDNkQxQkFDNTNDNzlGRjZDRDNDNzc3");
}]

myApp.config(httpsConfig)
    .constant("domain", domain)
    .constant("account", "T952F6A0BA")
    .constant("time", "1558078524306")
    .constant("authSig", "8721108710ea6ea76ffe2142cb093296")
    .constant("auth_token", "VDk1MkY2QTBCQQ==")
    .constant("resultsPerPage", "24")
    .constant("routingJson",  {
    "params": [

        {"route": "",                   "template": "/templates/home_page/Home.html",          controller: "homeCtrl as vm"},
  
     //   {"route": "",                   "template": "/templates/others/ComingSoon.html",        controller: "comingSoonCtrl as vm"},
        
        {"route": "admin",              "template": "/templates/others/Blank.html",             controller: "adminCtrl as vm"},

        {"route": "login",              "template": "/templates/Login.html",                    controller: "loginCtrl as vm"},

        {"route": "gallery",            "template": "/templates/shop/Gallery.html",             controller: "galleryCtrl as vm"},
        {"route": "products",           "template": "/templates/shop/Products.html",            controller: "productsCtrl as vm"},
        {"route": "promotions",         "template": "/templates/shop/Promotions.html",          controller: "promotionsCtrl as vm"},
        {"route": "checkout",           "template": "/templates/shop/Checkout.html",            controller: "checkoutCtrl as vm"},
        {"route": "shopCart",           "template": "/templates/shop/ShopCart.html",            controller: "shopCartCtrl as vm"},
        {"route": "productSingle",      "template": "/templates/shop/ProductSingle.html",       controller: "productSingleCtrl as vm"},

        {"route": "myAccount",          "template": "/templates/my_account/MyAccount.html",     controller: "myAccountCtrl as vm"},
        {"route": "wishlist",           "template": "/templates/my_account/Wishlist.html",      controller: "wishlistCtrl as vm"},
        {"route": "lostPassword",       "template": "/templates/my_account/LostPassword.html",  controller: "lostPasswordCtrl as vm"},
        {"route": "resetPassword",      "template": "/templates/my_account/ResetPassword.html", controller: "resetPasswordCtrl as vm"},
        {"route": "myAddresses",        "template": "/templates/my_account/MyAddresses.html",   controller: "myAddressesCtrl as vm"},
        {"route": "addNewAddress",      "template": "/templates/my_account/AddNewAddress.html", controller: "addNewAddressCtrl as vm"},
        {"route": "confirmation",       "template": "/templates/my_account/Confirmation.html",  controller: "confirmationCtrl as vm"},
        {"route": "history",            "template": "/templates/my_account/History.html",       controller: "historyCtrl as vm"},
        {"route": "viewOrder",          "template": "/templates/my_account/ViewOrder.html",     controller: "viewOrderCtrl as vm"},
        {"route": "trackOrder",         "template": "/templates/my_account/TrackOrder.html",    controller: "trackOrderCtrl as vm"},

        {"route": "aboutUs",            "template": "/templates/about/About.html",             controller: "aboutUsCtrl as vm"},
        {"route": "contactUs",          "template": "/templates/contact_us/ContactUs.html",    controller: "contactUsCtrl as vm"},

        {"route": "comingSoon",         "template": "/templates/others/Blank.html"},
        {"route": "404Error",           "template": "/templates/others/Blank.html"},

        {"route": "logout",             "template": "/logout.html",                             controller: "logoutCtrl as vm"} 
       

    ],
    "otherwiseOption" : {"template": "/templates/home_page/Home.html"}
})
    .config(function($routeProvider, routingJson){
    for(var i = 0; i < routingJson.params.length; i++){
        $routeProvider
            .when("/" + routingJson.params[i].route,
                  {
            templateUrl: routingJson.params[i].template,
            controller: routingJson.params[i].controller,
        })
            .otherwise({redirectTo:''})                                          
    }
}); 

