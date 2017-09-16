"use strict"

angular.module("stuMain")
    .directive("stuMain",function () {
       return {
           restrict:"AE",
           templateUrl:"ext-modules/student/stuMain/stuMainTemplate.html",
           replace:true,
           controller:"stuMainCtrl",
           transclude:true
       }
    });