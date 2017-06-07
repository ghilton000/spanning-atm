(function () {

    'use strict';

    // Initialize some configuration, including the routes and states in our application
    angular.module('atm')
        .config(config);

    // Injecting dependencies this way allows the code to be minified
    config.$inject = ['$urlRouterProvider', '$stateProvider'];

    function config($urlRouterProvider, $stateProvider) {

        // default routes
        $urlRouterProvider.otherwise("/home");

        // I know a newer version of ui-router allows components to be used in these states and that's what I would
        // use, time permitting. I didn't want to introduce an unknown (to me) like that for this project so I'm
        // sticking with controllers.
        $stateProvider

        // This is the ATM home page. The user may or may not be known, depending on whether they've entered their
        // PIN.
            .state('home', {
                url        : '/home',
                params     : {
                    logOut: undefined // Callers can add the logOut parameter to cause a logout when going home
                },
                templateUrl: 'app/controllers/home/home.html',
                controller : 'HomeController as $ctrl'
            })

            // This is the cash withdrawal page.
            .state('cash', {
                url        : '/cash',
                templateUrl: 'app/controllers/cash/cash.html',
                controller : 'CashController as $ctrl'
            })

            // This is the deposit page.
            .state('deposit', {
                url        : '/deposit',
                templateUrl: 'app/controllers/deposit/deposit.html',
                controller : 'DepositController as $ctrl'
            });

    }
})();
