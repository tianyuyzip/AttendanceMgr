"use strict";

angular.module("stuMain")
    .directive("stuCourseSignedList",["$q","$http","stuCourseSignedService",function ($q,$http,stuCourseSignedService) {
       return {
           restrict:"AE",
           replace:true,
           controller:"stuCourseSignedCtrl",
           templateUrl:"ext-modules/student/stuCourseSignedList/stuCourseSignedListTemplate.html",
           link:function (scope,el,attrs,ctrl) {

               // var courseinfo = stuCourseSignedService.courseService.get();
               // scope.coursename = courseinfo.coursename;
               // scope.courseno = courseinfo.courseno;
               // scope.begintime = courseinfo.begintime;
               // scope.signdate = new Date().getMonth()+1+"-"+new Date().getDate();
               // console.log(scope);
               // loadCourseSignedInfo(scope.courseno,scope.signdate,scope.begintime);
               //
               // // console.log(scope.recordList);
               //
               // function loadCourseSignedInfo(courseno,signdate,begintime){
               //     console.log(courseno+signdate+begintime);
               //     $http({
               //         method:"POST",
               //         url:"http://localhost/v1/stu/signinfo/course",
               //         params:{
               //             courseno:courseno,
               //             signdate:signdate,
               //             begintime:begintime
               //         }
               //     }).then(function (resp) {
               //         console.log(resp.data);
               //     })
               // }

         }
       }
    }]);