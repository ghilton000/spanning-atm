(function () {

    'use strict';

    // These are the third-party modules we'll use
    var REQUIRES = ['mwl.bluebird', 'ngSanitize', 'ui.bootstrap', 'ui.router'];

    // Define our ATM module
    angular.module('atm', REQUIRES)
        .run(run);

    run.$inject = ['$rootScope', '$log', '$q'];

    // The main function of our app
    function run($rootScope, $log, $q) {

        // https://github.com/mattlewis92/angular-bluebird-promises#unhandled-rejections
        $q.onPossiblyUnhandledRejection(function (ex) {

            // Ignore noise from ui-router
            if (!ex || (ex.message && ex.message.match(/transition (superseded|prevented|aborted|failed)/))) {
                return;
            }

            $log.warn('Unhandled rejection', ex);
        });

        // Store simulated users in $rootScope for simplicity. Normally, these would live in a database on a server.
        // Normally, the pins/passwords would be hashed and not stored in the clear
        // Balances are in cents
        $rootScope.users = [
            {
                first  : 'Han',
                last   : 'Solo',
                pin    : 1111,
                balance: 11111
            },
            {
                first  : 'Leia',
                last   : 'Organa',
                pin    : 2222,
                balance: 22222
            },
            {
                first  : 'Kylo',
                last   : 'Ren',
                pin    : 3333,
                balance: 33333
            }
        ];

        // Begin with no authenticated user
        $rootScope.currentUser = null;

        $rootScope.$on('$stateChangeSuccess', function (/*event, toState, toParams, fromState, fromParams*/) {

            // When the state changes, we should see the top of the new page's content;
            // this forces that effect by scrolling to the top on state change.
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState/*, fromState, fromParams*/) {

            $log.error('state not found "' + unfoundState.name + '"');
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            $log.error('state change error from "' + fromState.name + '" to "' + toState.name + '": ' + error);
        });
    }
})();
