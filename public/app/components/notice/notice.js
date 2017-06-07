(function () {

    'use strict';

    // This controller manages the notice dialog
    angular.module('atm')
        .controller('NoticeController', controller);

    controller.$inject = ['message', 'title'];

    function controller(message, title) {

        // TODO message is required, so validate

        /* jshint validthis:true */
        var $ctrl = this;

        // Set a default title if one was not supplied
        $ctrl.title   = title || 'Notice';
        $ctrl.message = message;
    }

})();
