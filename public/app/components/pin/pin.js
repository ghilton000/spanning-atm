(function () {

    'use strict';

    // This controller manages the PIN entry dialog
    angular.module('atm')
        .controller('PinController', controller);

    controller.$inject = ['_', '$rootScope', '$uibModalInstance', 'NoticeService'];

    function controller(_, $rootScope, $uibModalInstance, NoticeService) {

        /* jshint validthis:true */
        var $ctrl = this;

        // These are the functions exposed to the view
        $ctrl.addDigit        = addDigit;
        $ctrl.cancel          = cancel;
        $ctrl.ok              = ok;
        $ctrl.removeLastDigit = removeLastDigit;

        $ctrl.pin = '';

        // TODO: Look for keystrokes in case the ATM has a physical keypad

        // Called when a digit button is pressed to add a digit to the end of the PIN
        function addDigit(digit) {

            $ctrl.pin += digit;
            pinChanged();
        }

        // Called when the backspace/delete button is pressed to remove the last typed character.
        function removeLastDigit() {

            var length = $ctrl.pin.length;
            if (length > 0) {
                $ctrl.pin = $ctrl.pin.substring(0, length - 1);
                pinChanged();
            }
        }

        // Call when the PIN changes to update the mask value
        function pinChanged() {

            $ctrl.maskedPin = new Array($ctrl.pin.length + 1).join('*');
        }

        // Never mind
        function cancel() {

            $uibModalInstance.dismiss();
        }

        // Checks the entered PIN against the list of known PINs
        function ok() {

            // Find the user with the matching pin
            var user = _.find($rootScope.users, {pin: Number($ctrl.pin)});
            if (user) {

                $uibModalInstance.close(user);

            } else {

                $ctrl.pin = '';
                pinChanged();

                NoticeService.displayNotice('Invalid PIN', 'Error');
            }
        }
    }

})();
