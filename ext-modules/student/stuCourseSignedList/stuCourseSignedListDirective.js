"use strict";

angular.module("stuMain")
    .directive("stuCourseSignedList",["$q","$http","stuCourseSignedService",function ($q,$http,stuCourseSignedService) {
       return {
           restrict:"AE",
           replace:true,
           controller:"stuCourseSignedCtrl",
           templateUrl:"ext-modules/student/stuCourseSignedList/stuCourseSignedListTemplate.html",
           link:function (scope,el,attrs,ctrl) {

         }
       }
    }]);