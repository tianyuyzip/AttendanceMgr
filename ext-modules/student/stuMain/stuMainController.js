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
                loadTodayCourses();            //加载当天所有课程信息，读取系统时间
             }
        })();

        $scope.showSignedList = false;       //用于ng-if的判断，如果要显示用户所有签到界面，设置为true，否则默认显示签到按钮

        /**
         * 获取总得签到记录数,提供给stuSignedList引用
         * */
        this.getTotleCnt = function () {
            return $scope.totlecnt;
        }

        /**
         * @stuno：用来查找签到记录的学生学号
         * @status：签到的状态，通过后台自动对应的签到状态记录数+1
         * 返回此学生的签到记录数
         * */
        this.updateSignCnt = function (stuno,status) {
                $http({
                    method:"GET",
                    url:"http://localhost/v1/stu/signCnt/"+stuno+"/"+status
                }).then(function (resp) {
                    updateSignCntInTitle(resp.data.result[0]);
                })
        };

        /**
         * 更新头部的签到记录数
         * */
        function updateSignCntInTitle(info) {
                // console.log($scope);
                $scope.$applyAsync(function() {
                    $scope.absentcnt = info.absentcnt;
                    $scope.normalcnt = info.normalcnt;
                    $scope.latecnt = info.latecnt;
                    $scope.totlecnt = info.absentcnt+info.normalcnt+info.latecnt;
                });
        };

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