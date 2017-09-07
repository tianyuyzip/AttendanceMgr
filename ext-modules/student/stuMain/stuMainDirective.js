"use strict"

angular.module("stuMain")
    .directive("stuMain",["$rootScope",function ($rootScope) {
       return {
           restrict:"AE",
           scope:{},
           templateUrl:"ext-modules/student/stuMain/stuMainTemplate.html",
           replace:true,
           controller:"stuMainCtrl"
       }
    }]);