QUnit.test('DataStore Tests', function(assert) {
    var App = window.App;
    var ds = new App.DataStore();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    assert.deepEqual(ds.getAll(), {
        'james@bond.com': 'eshpressho',
        'm@bond.com': 'tea'
    });
    ds.remove('james@bond.com');

    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea'
    });
    assert.equal(ds.get('m@bond.com'), 'tea');
    assert.equal(ds.get('james@bond.com'), undefined);
});

QUnit.test('Truck Tests', function(assert) {
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;
    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });
    assert.deepEqual(myTruck.getOrders(), ['me@goldfinger.com', 'dr@no.com', 'm@bond.com']);
    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');
    assert.deepEqual(myTruck.getOrders(), ['me@goldfinger.com']);
});
