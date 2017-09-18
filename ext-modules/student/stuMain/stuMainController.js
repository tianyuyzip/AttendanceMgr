"use strict"

angular.module("stuMain")
    .controller("stuMainCtrl",["$scope","$rootScope","$location","$window","$http",
        function ($scope,$rootScope,$location,$window,$http) {
        //检查是否登陆，否则跳转到登陆界面
        (function () {
            // console.log($rootScope.user);
            if(!$rootScope.user) {
                $location.path("/login");
             }else {
                loadTodayCourses();
             }
        })();

        $scope.showSignedList = false;
        // console.log($scope);
        this.getTotleCnt = function () {
            return $scope.totlecnt;
        }

            this.updateSignCnt = function (stuno,status) {
                $http({
                    method:"GET",
                    url:"http://localhost/v1/stu/signCnt/"+stuno+"/"+status
                }).then(function (resp) {
                    updateSignCntInTitle(resp.data.result[0]);
                })
            }

            function updateSignCntInTitle(info) {
                // console.log($scope);
                $scope.$applyAsync(function() {
                    $scope.absentcnt = info.absentcnt;
                    $scope.normalcnt = info.normalcnt;
                    $scope.latecnt = info.latecnt;
                    $scope.totlecnt = info.absentcnt+info.normalcnt+info.latecnt;
                });
            }

        /**
         * 加载当天所有课程信息
         * */
        function loadTodayCourses () {

                var date = new Date();
                var month = String(date.getMonth()+1);
                var day = String(date.getDate());
                var md = month+"-"+day;          //月份 / 日

                $http({
                    method:"GET",
                    url:"http://localhost/v1/stu/course/"+md
                }).then(
                    function (resp) {
                        $scope.courses = resp.data.result;
                    }
                );
        }

    }]);