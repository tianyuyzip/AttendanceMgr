"use strict"

angular.module("login")
       .directive("login",function(){

           return {
               restrict:"AE",
               scope:{},
               templateUrl:"ext-modules/login/loginTemplate.html",
               replace:true,
               controller:"loginControl",
               link:function (scope,el,attrs,ctrl) {
                   scope.identify = "1";
               }
           }
       });