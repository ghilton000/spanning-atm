(function () {

    'use strict';

    // This controller manages the home page view.
    angular.module('atm')
        .controller('HomeController', controller);

    controller.$inject =
        ['$filter', '$q', '$rootScope', '$state', '$stateParams', '$timeout', '$uibModal', 'NoticeService'];

    function controller($filter, $q, $rootScope, $state, $stateParams, $timeout, $uibModal, NoticeService) {

        /* jshint validthis: true */
        var $ctrl = this;

        // These are the functions exposed to the view
        $ctrl.deposit    = deposit;
        $ctrl.done       = done;
        $ctrl.getBalance = getBalance;
        $ctrl.getCash    = getCash;

        // We'll use this to format balances for display
        var dollars = $filter('dollars');

        // Log out if requested
        if ($stateParams.logOut) {
            done();
        }

        // Displays the deposit screen after first prompting for a PIN, if necessary
        function deposit() {

            promptForPin()
                .then(function () {
                    $state.go('deposit');
                })
                .catch(handleError);
        }

        // Logs out the current user
        function done() {

            $rootScope.currentUser = null;
        }

        // Displays the balance screen after first prompting for a PIN, if necessary
        function getBalance() {

            promptForPin()
                .then(function () {

                    var cents    = $rootScope.currentUser.balance;
                    var balance$ = dollars(cents, 2);

                    return NoticeService.displayNotice(
                        $rootScope.currentUser.first + ', your current balance is ' + balance$,
                        'Your balance');
                })
                .catch(handleError);
        }

        // Displays the cash screen after first prompting for a PIN, if necessary
        function getCash() {

            promptForPin()
                .then(function () {
                    $state.go('cash');
                })
                .catch(handleError);
        }

        function handleError(error) {

            if (error) {
                return NoticeService.displayNotice(error, 'Error');
            }
        }

        // If the current user is not known, prompts for and validates a PIN
        function promptForPin() {

            if ($rootScope.currentUser) {
                return $q.resolve();
            }

            var modalOptions = {
                backdrop   : 'static',
                templateUrl: 'app/components/pin/pin.html',
                controller : 'PinController as $ctrl',
                size       : 'md',
                resolve    : {}
            };

            return $uibModal.open(modalOptions).result
                .then(function (user) {

                    // TODO We'd want to use $timeout to automatically log the user out after a short period of
                    // inactivity
                    $rootScope.currentUser = user;

                    // Use a timeout so the modal goes away before any subsequent action occurs.
                    return $timeout(function () {
                    }, 250/*msec delay*/);
                });
        }
    }

})();
