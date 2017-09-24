"use strict"

angular.module("stuMain")
    .controller("stuBodyCtrl",["$scope","$http","$location",function ($scope,$http,$location) {
        /**
         * 通过xx：xx字符串获得时间毫秒用于比较是否到达上课时间
         * */
        $scope.getTimes = function (date) {
            var time = new Date();
            time.setHours(date.split(":")[0]);
            time.setMinutes(date.split(":")[1]);

            return time.getTime();
        }

        // console.log($scope);
        /**
         * 添加到数据库一条签到记录
         * info：签到记录
         * */
        $scope.addSigninfo = function(info) {
            $http({
                method:"POST",
                url:"http://localhost/v1/stu/signinfo/info",
                params:{
                    info:info
                }
            }).then(
                function (resp) {
                    console.log(resp.data);
                }
            )
        }

        /**
         * 通过学号，课程号，日期，课程开始时间获取签到记录
         * 用于初始化界面，如果已经签到的，再次登陆能够自动显示。
         * */
        $scope.getSignedinfo= function (stuno,courseno,date,begintime) {
            $http({
                method:"GET",
                url:"http://localhost/v1/stu/signinfo/"+stuno+"/"+courseno+"/"+date+"/"+begintime
            }).then(
                function (resp) {
                     // console.log(resp);
                    if(resp.data.result!=1) {
                            $scope.status = resp.data.result[0].status;
                            $scope.signtime = resp.data.result[0].signtime;

                        if ($scope.status === 1) {
                            $scope.signStatus = "已签到";
                            $scope.signMark = "(正常)  签到时间 " + $scope.signtime;
                        }else if ($scope.status === 2) {
                            $scope.signStatus = "已签到";
                            $scope.signMark = "(迟到)  签到时间 " + $scope.signtime;
                        }
                    }
                }
            )
        };

        /**
         * 跳转到课程签到页面
         * */
        $scope.showSignedListPage = function () {
            $scope.$applyAsync(function () {
                $location.path("/stuCourseSignedList");
            })
        }

    }]);