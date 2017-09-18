"use strict";

angular.module("stuMain")
    .controller("stuCourseSignedCtrl",["$scope","$rootScope","$location","stuCourseSignedService",
        function ($scope,$rootScope,$location,stuCourseSignedService) {

        $scope.hasList = true;

        (function () {
            // console.log($rootScope.user);
            if(!$rootScope.user) {
                $location.path("/login");
            }else {

                var courseinfo = stuCourseSignedService.courseService.get();
                console.log(courseinfo);
                var courseno = courseinfo.courseno;
                var begintime = courseinfo.begintime;
                var signdate = new Date().getMonth()+1+"-"+new Date().getDate();
                stuCourseSignedService.loadCourseSignedInfo(courseno,signdate,begintime).then(
                    function(result){
                        console.log(result);
                        $scope.recordList = result;
                    }
                );

                console.log($scope.recordList);
            }
        })();
    }]);