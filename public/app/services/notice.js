(function () {

    'use strict';

    // This service provides some convenience methods for displaying simple notification dialogs
    angular.module('atm')
        .factory('NoticeService', factory);

    factory.$inject = ['$uibModal'];

    function factory($uibModal) {

        var service = {};

        service.displayNotice = displayNotice;
        return service;

        // Displays a notice dialog containing a message. 'message' is required. 'title' is optional and defaults to
        // 'Notice'.
        function displayNotice(message, title) {

            var modalOptions = {
                backdrop   : 'static',
                templateUrl: 'app/components/notice/notice.html',
                controller : 'NoticeController as $ctrl',
                size       : 'sm',
                resolve    : {
                    message: function () {
                        return message;
                    },
                    title  : function () {
                        return title;
                    }
                }
            };

            // Return the result promise
            return $uibModal.open(modalOptions).result;
        }
    }

})();
