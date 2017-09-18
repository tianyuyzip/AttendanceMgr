"use strict";

angular.module("stuMain")
    .controller("stuMessageCtrl",["$rootScope","$scope","$location","$http",
        function ($rootScope,$scope,$location,$http) {
        (function () {
            if(!$rootScope.user){
                $location.path("/stuMain");
            }
        })();
        $scope.stuname = $rootScope.user.stuname;

        $scope.back = function () {
            $location.path("/stuMain");
        }

        $scope.setNewPassword = function (stuno,password) {
            $http({
                method:"GET",
                url:"http://localhost/v1/stu/"+stuno+"/"+password
            }).then(function (resp) {
                if(resp.data.result==0){
                    $location.path("/login");
                }
            })
        }
    }]);