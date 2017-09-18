"use strict";

angular.module("stuMain")
    .controller("stuHeaderCtrl",["$scope","$window","$rootScope","$location","$http",
        function ($scope,$window,$location,$rootScope,$http){

        /*
        * 加载历史签到次数信息
        * */
        $scope.loadAllAttHistoryCnt = function(stuno,stuname) {
            $http({
                method:"GET",
                url:"http://localhost/v1/stu/signin/"+stuno+"/"+stuname
            }).then(
                function (resp) {
                    $scope.$applyAsync(function () {
                        var record = resp.data.result[0];
                        // console.log(record);
                        $scope.normalcnt = record.normalcnt;
                        $scope.latecnt = record.latecnt;
                        $scope.absentcnt = record.absentcnt;
                        $scope.totlecnt = record.normalcnt+record.latecnt+record.absentcnt;
                    })
                }
            )
        };

    }]);