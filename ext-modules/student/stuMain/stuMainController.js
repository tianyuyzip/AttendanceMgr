"use strict"

angular.module("stuMain")
    .controller("stuMainCtrl",["$scope","$rootScope","$location","$window","$http",
        function ($scope,$rootScope,$location,$window,$http) {
        //检查是否登陆，否则跳转到登陆界面
        (function () {
            console.log($rootScope.user);
            if(!$rootScope.user){
                $location.path("/login");
            }else{
                loadAllAttHistory($rootScope.user.stuno);
            }
        })();
        //登陆的用户
        $scope.user = $rootScope.user;

        function loadAllAttHistory (stuno) {
            $http({
                method:"GET",
                url:"http://localhost/v1/stu/signin/"+stuno
            }).then(
                function (resp) {
                    var record = resp.data.result[0];
                    $scope.normalcnt = record.normalcnt;
                    $scope.latecnt = record.latecnt;
                    $scope.absentcnt = record.absentcnt;
                    $scope.totlecnt = record.normalcnt+record.latecnt+record.absentcnt;
                }
            )
        }

        $scope.quit = function () {
            if(!$rootScope.user)
                return;
            else {
                if($window.confirm("尊敬的  "+$rootScope.user.stuname+"  用户，您确定要退出系统吗？"))
                {
                    $rootScope.user = null;
                    $location.path("/login");
                }else
                    return;
            }
        }
    }]);