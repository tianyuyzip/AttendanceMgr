"use strict";

angular.module("stuMain")
    .controller("stuCourseSignedCtrl",["$scope","$rootScope","$location","$http","stuCourseSignedService",
        function ($scope,$rootScope,$location,$http,stuCourseSignedService) {

        $scope.hasList = true;            //如果列表有数据，显示列表，否则显示提示信息，作为ng-if的判断条件
        var records = new Array();

        (function () {                      //判断是否登录
            // console.log($rootScope.user);
            if(!$rootScope.user) {
                $location.path("/login");
            }else {
                    /**
                     * stuCourseSignedService 为自定义服务
                     * courseService ：get方法用来获取所点击查看签到列表的课程信息
                     * */
                    var courseinfo = stuCourseSignedService.courseService.get();
                    $scope.coursename = courseinfo.coursename;
                    $scope.courseno = courseinfo.courseno;
                    $scope.begintime = courseinfo.begintime;
                    $scope.signdate = new Date().getMonth()+1+"-"+new Date().getDate();
                /**
                 * stuCourseSignedService 为自定义服务
                 * loadCourseSignedInfo:加载指定课程的签到记录(课程号，签到日期，课程开始时间)
                 * */
                stuCourseSignedService.loadCourseSignedInfo($scope.courseno,$scope.signdate,$scope.begintime).then(
                    function(result){
                        $scope.$applyAsync(function () {
                            records = result;
                            $scope.signcnt=records.length;
                            if(records.length<1){
                                $scope.hasList = false;              //如果没有该课程的签到记录 显示提示信息
                            }
                            var cnt = 0;                            //用来记录迟到的人数
                            records.forEach(function (record) {
                                if(record.status==2){               //状态2表示迟到的记录
                                    cnt ++;
                                }
                            })
                            $scope.latecnt = cnt;
                            $scope.recordList = result;
                        })

                    }
                );
            }
        })();
        $scope.lateScore = 2;                      //设置迟到一次扣2分

        $scope.back = function () {               //返回主页面
            $location.path("/stuMain");
        }

    }]);