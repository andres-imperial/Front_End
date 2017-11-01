(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://localhost:3002/coffeeorders';
    var $ = window.jQuery;
    var App = window.App;
    var Truck = App.Truck;
    // var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var Validation = App.Validation;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('ncc-1701', remoteDS);
    // var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function(data) {
        var defer = $.Deferred();
        $.get(SERVER_URL + '?emailAddress=' + data.emailAddress, function(serverResponse) {
            if (serverResponse.length != 0) {
                defer.reject();
                var message = 'Order already exists';
                document.getElementById('emailInput').setCustomValidity(message);
            } else {
                defer.resolve();
                return myTruck.createOrder.call(myTruck, data)
                    .then(function() {
                        checkList.addRow.call(checkList, data);
                    });
            }
        });
        return defer;
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);
    myTruck.printOrders(checkList.addRow.bind(checkList));
    formHandler.addDecafHandler(Validation.isDecaf);

})(window);
