"use strict";

angular.module("stuMain")
    .directive("stuBtn",["$rootScope",function ($rootScope) {

        return {
            restrict:"AE",
            require:"^stuMain",
            controller:"stuBodyCtrl",
            templateUrl:"ext-modules/student/stuBody/stuBodyTemplate.html",
            replace:true,
            link:function (scope,el,attrs,ctrl) {

                var now = new Date();

                /**
                 * 设置课程状态
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
                setRecordStatus(now);

                $(el).find("button").on("click",function () {
                    if(scope.signStatus==="缺勤"){
                        var password = prompt("请输入签到密码：");
                        if(password===scope.course.password){
                            console.log(scope.$parent);
                            scope.updateSignCnt($rootScope.user.stuno,scope.signStatus);
                        }
                    }
                })
            }

        }
    }]);