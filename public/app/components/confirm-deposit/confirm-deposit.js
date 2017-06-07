(function () {

    'use strict';

    // This controller manages the dialog that confirms deposit amounts
    angular.module('atm')
        .controller('ConfirmDepositController', controller);

    controller.$inject = ['_', '$rootScope', '$uibModalInstance'];

    function controller(_, $rootScope, $uibModalInstance) {

        /* jshint validthis:true */
        var $ctrl = this;

        // These are the functions exposed to the view
        $ctrl.cancel = cancel;
        $ctrl.ok     = ok;

        // Show some sample deposits
        $ctrl.cash   = 10000; // cents
        $ctrl.checks = [
            {
                number: 2345,
                amount: 5432
            },
            {
                number: 3456,
                amount: 6543
            }
        ];

        // Compute the total deposit.
        $ctrl.total = $ctrl.cash;
        _.forEach($ctrl.checks, function (check) {
            $ctrl.total += check.amount;
        });

        // Never mind
        function cancel() {

            $uibModalInstance.dismiss();
        }

        // Adds the deposits to the balance
        function ok() {

            // TODO Don't add checks until they clear
            $rootScope.currentUser.balance += $ctrl.total;

            $uibModalInstance.close();
        }
    }

})();
