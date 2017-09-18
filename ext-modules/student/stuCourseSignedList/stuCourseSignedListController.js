"use strict";

angular.module("stuMain")
    .controller("stuCourseSignedCtrl",["$scope","$rootScope","$location","$http","stuCourseSignedService",
        function ($scope,$rootScope,$location,$http,stuCourseSignedService) {

        $scope.hasList = true;
        var records = new Array();

        (function () {
            // console.log($rootScope.user);
            if(!$rootScope.user) {
                $location.path("/login");
            }else {
                    var courseinfo = stuCourseSignedService.courseService.get();
                    $scope.coursename = courseinfo.coursename;
                    $scope.courseno = courseinfo.courseno;
                    $scope.begintime = courseinfo.begintime;
                    $scope.signdate = new Date().getMonth()+1+"-"+new Date().getDate();

                stuCourseSignedService.loadCourseSignedInfo($scope.courseno,$scope.signdate,$scope.begintime).then(
                    function(result){
                        $scope.$applyAsync(function () {
                            records = result;
                            $scope.signcnt=records.length;
                            if(records.length<1){
                                $scope.hasList = false;
                            }
                            var cnt = 0;
                            records.forEach(function (record) {
                                if(record.status==2){
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
        $scope.lateScore = 2;

        $scope.back = function () {
            $location.path("/stuMain");
        }

    }]);