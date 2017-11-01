(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            fn(data)
                .then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity(message);
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addDecafHandler = function(fn) {
        console.log('Setting decaf handler for validation');
        this.$formElement.on('change', '[name="strength"]', function(event) {
            var coffee = document.getElementById('coffeeOrder');
            var strength = event.target.value;
            var message = 'Not valid decaf order, strength must be 20 or less.';
            if (fn(coffee.value, strength)) {
                event.target.setCustomValidity('');
                coffee.setCustomValidity('');
            } else {
                event.target.setCustomValidity(message);
                coffee.setCustomValidity('');
            }
        });

        this.$formElement.on('input', '[name="coffee"]', function(event) {
            var coffee = event.target.value;
            var strength = document.getElementById('strengthLevel');
            var message = 'Not valid decaf order, strength must be 20 or less.';
            if (fn(coffee, strength.value)) {
                event.target.setCustomValidity('');
                strength.setCustomValidity('');
            } else {
                event.target.setCustomValidity(message);
                strength.setCustomValidity('');
            }
        });


    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
