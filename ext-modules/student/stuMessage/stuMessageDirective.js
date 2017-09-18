"use strict";

angular.module("stuMain")
    .directive("stuMessage",function () {
       return{
           restrict:"AE",
           replace:true,

       }
    });