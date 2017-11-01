(function(window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function(order) {
        order.id = order.emailAddress;
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for' + customerId);
        return this.db.remove(customerId);
    };

    // Created this function to return keys from current orders
    Truck.prototype.getOrders = function() {
        return Object.keys(this.db.getAll());
    };

    // This does not return any values and therefor not possible to check if
    // it is printing the correct output.
    Truck.prototype.printOrders = function(printFn) {
        return this.db.getAll()
            .then(function(orders) {
                var customerIdArray = Object.keys(orders);

                console.log('Truck #' + this.truckId + ' has pending orders:');
                customerIdArray.forEach(function(id) {
                    console.log(orders[id]);
                    if (printFn) {
                        printFn(orders[id]);
                    }
                }.bind(this));
            }.bind(this));
    };

    App.Truck = Truck;
    window.App = App;

})(window);
