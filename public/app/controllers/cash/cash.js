(function () {

    'use strict';

    // This controller manages the cash withdrawal view.
    angular.module('atm')
        .controller('CashController', controller);

    controller.$inject = ['$rootScope', '$state', 'NoticeService'];

    function controller($rootScope, $state, NoticeService) {

        // If not logged in redirect to home
        if (!$rootScope.currentUser) {
            $state.go('home');
            return;
        }

        /* jshint validthis: true */
        var $ctrl = this;

        // These are the functions exposed to the view
        $ctrl.done          = done;
        $ctrl.home          = home;
        $ctrl.withdraw      = withdraw;
        $ctrl.withdrawOther = withdrawOther;

        // Log out and go home
        function done() {

            $state.go('home', {logOut: true});
        }

        // Return to the home screen
        function home() {

            $state.go('home');
        }

        // Called when the user wants to withdraw a predefined amount.
        function withdraw(cents) {

            // Deduct the amount from the balance.
            $rootScope.currentUser.balance -= cents;

            NoticeService.displayNotice(
                '<p>Please take your cash.</p><p>(I think we would ask here if they want to do anything else and log them out if not.)</p>',
                'Thank you');
        }

        // Called when the user wants to withdraw an amount other than one of the predefined amounts.
        function withdrawOther() {

            NoticeService.displayNotice(
                '<p>TBD</p><p>We would prompt for an amount up to the available balance in an increment of the types of bills available ($10s, $20s, etc.)</p>',
                'Enter amount');
        }
    }

})();
