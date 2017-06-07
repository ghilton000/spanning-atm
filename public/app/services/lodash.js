(function () {

    'use strict';

    // Creates an injectable service for lodash
    angular.module('atm')
        .factory('_', factory);

    factory.$inject = ['$window', '$log'];

    function factory($window, $log) {

        if (!$window._) {
            $log.error('lodash not found');
        }

        return $window._;
    }
})();
