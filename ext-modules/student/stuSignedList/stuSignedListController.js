"use strict";

angular.module("stuMain")
    .controller("stuSignedListCtrl",["$rootScope","$scope","$location","$http",
        function ($rootScope,$location,$scope,$http) {

            $scope.pageNo = 1;
            $scope.isFirst = true;

    }]);