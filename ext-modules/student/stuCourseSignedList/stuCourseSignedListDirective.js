"use strict";

angular.module("stuMain")
    .directive("stuCourseSignedList",function () {
       return {
           restrict:"AE",
           replace:true,
           scope:{},
           controller:"stuCourseSignedCtrl",
           templateUrl:"ext-modules/student/stuCourseSignedList/stuCourseSignedListTemplate.html"
       }
    });