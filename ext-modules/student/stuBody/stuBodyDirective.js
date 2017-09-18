"use strict";

angular.module("stuMain")
    .directive("stuBtn",["$rootScope","$window","$location","stuCourseSignedService",
        function ($rootScope,$window,$location,stuCourseSignedService) {

        return {
            restrict:"AE",
            controller:"stuBodyCtrl",
            require:"^stuMain",
            templateUrl:"ext-modules/student/stuBody/stuBodyTemplate.html",
            replace:true,
            link:function (scope,el,attrs,ctrl) {

                var now = new Date();

                /**
                 * 设置按钮状态，如果之前有签到过的则显示已签到
                 * */
                scope.getSignedinfo($rootScope.user.stuno,scope.course.courseno,scope.course.date,scope.course.begintime);

                /**
                 * 预设置课程状态
                 * */
                setRecordStatus(now);

                /**
                 * 预设置课程状态
                 * */
                function setRecordStatus(now) {
                    // console.log(getHour(scope.course.begintime));
                    var nowTime = now.getTime();

                    if(nowTime>scope.getTimes(scope.course.begintime) && nowTime<scope.getTimes(scope.course.endtime)){
                        scope.signStatus = "迟到";
                        return;
                    }
                    if(nowTime>scope.getTimes(scope.course.endtime)){
                        scope.signStatus = "缺勤";
                        return;
                    }
                    if(nowTime>=scope.getTimes(scope.course.begintime)-15*60*1000 && nowTime<=scope.getTimes(scope.course.begintime) ){
                        scope.signStatus = "待签到";
                        return;
                    }
                    if(nowTime<scope.getTimes(scope.course.begintime)){
                        scope.signStatus = "未开始";
                    }
                }

                /**
                 * 点击签到按钮
                 * */
                $(el).find("button").on("click",function () {

                    scope.status = 0;
                    var now = new Date();
                    var hours = "";
                    var minute = "";

                    var signdate = now.getMonth()+1+"-"+now.getDate();
                    if(now.getHours()<10){
                        hours = "0"+now.getHours();
                    }else{
                        hours = now.getHours();
                    }
                    if(now.getMinutes()<10){
                        minute = "0"+now.getMinutes();
                    }else{
                        minute = now.getMinutes();
                    }
                    var signtime = hours+":"+minute;

                    if(scope.signStatus==="已签到"){
                        stuCourseSignedService.courseService.set(scope.course);
                        scope.showSignedListPage();
                    }
                    if(scope.signStatus==="缺勤"){
                        stuCourseSignedService.courseService.set(scope.course);
                        scope.showSignedListPage();
                    }
                    if(scope.signStatus==="未开始"){
                        alert("课程签到还未开始。");
                    }
                    if(scope.signStatus==="待签到"){
                        var password = prompt("请输入签到密码：");
                        if(password===scope.course.password){
                            // console.log(scope.$parent);
                            ctrl.updateSignCnt($rootScope.user.stuno,scope.signStatus);
                            scope.signStatus = "已签到";
                            scope.signMark = "(正常)  签到时间 "+signtime;
                            scope.status = 1;                  //1正常签到 -1缺勤  2迟到
                        }
                    }
                    if(scope.signStatus==="迟到"){
                        var password = prompt("请输入签到密码：");
                        if(password===scope.course.password){
                            // console.log(scope.$parent);
                            ctrl.updateSignCnt($rootScope.user.stuno,scope.signStatus);
                            scope.signStatus = "已签到";
                            scope.signMark = "(迟到)  签到时间 "+signtime;
                            scope.status = 2;
                        }
                    }
                    if(scope.status===1||scope.status===-1||scope.status===2) {     //判断是否有签到动作
                        var signinfo = {
                            stuno: $rootScope.user.stuno,
                            stuname: $rootScope.user.stuname,
                            courseno: scope.course.courseno,
                            coursename: scope.course.coursename,
                            signdate: signdate,
                            signtime: signtime,
                            begintime: scope.course.begintime,
                            status: scope.status
                        }

                        scope.addSigninfo(signinfo);                  //签到信息添加到数据库
                    }

                })
            }

        }
    }]);