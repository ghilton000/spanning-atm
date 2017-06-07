(function () {

    'use strict';

    // This filter takes a value in cents and formats it as dollars and cents with the $ sign.
    angular.module('atm')
        .filter('dollars', dollars);

    dollars.$inject = ['$filter'];

    function dollars($filter) {

        // Our dollars filter is based on the angular currency filter
        var currency = $filter('currency');

        return function (costInCents, fractionSize) {

            var costInDollars = costInCents / 100;
            return currency(costInDollars, '$', fractionSize);
        };
    }
})();
