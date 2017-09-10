"use strict";

angular.module("stuBody")
    .directive("stuBtn",function () {

        return {
            restrict:"AE",
            controller:"stuBodyCtrl",
            templateUrl:"ext-modules/student/stuBody/stuBodyTemplate.html",
            replace:true,
            scope:{}
        }
    });