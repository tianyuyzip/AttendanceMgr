"use strict"

angular.module("stuMain")
    .controller("stuMainCtrl",["$scope","$rootScope","$location","$window","$http",
        function ($scope,$rootScope,$location,$window,$http) {
        //检查是否登陆，否则跳转到登陆界面
        (function () {
            // console.log($rootScope.user);
            if(!$rootScope.user){
                $location.path("/login");
            }else{
                loadAllAttHistoryCnt($rootScope.user.stuno);
                loadTodayCourses();
            }
        })();
        //登陆的用户
        $scope.user = $rootScope.user;

        /*
        * 加载历史签到次数信息
        * */
        function loadAllAttHistoryCnt (stuno) {
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

        function loadAllUserHistory(stuno) {
            $http({
                method:"GET",
                url:"http://localhost/v1/stu/signinfo/"+stuno
            }).then(
                function (resp) {
                    console.log(resp.data.result);
                }
            );
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

        function setSignCnt() {

        }

        /*
        * 退出系统
        * */
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