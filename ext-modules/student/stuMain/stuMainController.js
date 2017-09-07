"use strict"

angular.module("stuMain")
    .controller("stuMainCtrl",["$scope","$rootScope","$location",function ($scope,$rootScope,$location) {
        //检查是否登陆，否则跳转到登陆界面
        (function () {
            console.log($rootScope.user);
            if(!$rootScope.user){
                $location.path("/login");
            }
        })();
        //登陆的用户
        $scope.user = $rootScope.user;

        $scope.loadAllAttHistory = function () {
            
        }
    }]);