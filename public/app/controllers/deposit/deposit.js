(function () {

    'use strict';

    // This controller manages the deposits view.
    angular.module('atm')
        .controller('DepositController', controller);

    controller.$inject = ['$rootScope', '$state', '$uibModal', 'NoticeService'];

    function controller($rootScope, $state, $uibModal, NoticeService) {

        // If not logged in redirect to home
        if (!$rootScope.currentUser) {
            $state.go('home');
            return;
        }

        /* jshint validthis: true */
        var $ctrl = this;

        // These are the functions exposed to the view
        $ctrl.done = done;
        $ctrl.home = home;
        $ctrl.scan = scan;

        // Log out and go home
        function done() {

            $state.go('home', {logOut: true});
        }

        // Return to the home screen
        function home() {

            $state.go('home');
        }

        // Simulates check and cash insertion into the deposit slot
        function scan() {

            var modalOptions = {
                backdrop   : 'static',
                templateUrl: 'app/components/confirm-deposit/confirm-deposit.html',
                controller : 'ConfirmDepositController as $ctrl',
                size       : 'sm',
                resolve    : {}
            };

            return $uibModal.open(modalOptions).result
                .catch(function (error) {

                    if (error) {
                        return NoticeService.displayNotice(error, 'Error');
                    }
                });
        }
    }

})();
