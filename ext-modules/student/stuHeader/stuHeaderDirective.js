"use strict";

angular.module("stuMain")
    .directive("stuHeader",["$rootScope","$location","$window",function ($rootScope,$location,$window) {
        return{
            restrict:"AE",
            replace:true,
            controller:"stuHeaderCtrl",
            templateUrl:"ext-modules/student/stuHeader/stuHeaderTemplate.html",
            link:function (scope,el,attrs,ctrl) {
                    scope.user = $rootScope.user;            //获取登陆用户信息
                    /**
                     * 初始化签到记录数
                     * */
                    scope.loadAllAttHistoryCnt(scope.user.stuno,scope.user.stuname);

                // scope.loadAllSignedRecord = function () {
                //     $location.path("/stuSignedList");
                // };
                /**
                 * 显示本用户所有的签到记录
                 * */
                scope.loadAllSignedRecord = function () {
                    scope.showSignedList = true;    //用于ng-if的判断，如果要显示用户所有签到界面，设置为true，否则默认显示签到按钮
                }

                /**
                 * 显示主界面（签到按钮界面）
                 * */
                scope.toMainPage = function () {
                    // $location.path("/stuMain");
                    scope.showSignedList = false;   //用于ng-if的判断，如果要显示用户所有签到界面，设置为true，否则默认显示签到按钮
                };

                /**
                * 点击姓名按钮，转到修改信息界面
                * */
                scope.toUpdatePage = function () {
                    $location.path("/stuMessage");
                };

                /*
                * 退出系统
                * */
                scope.quit = function () {
                    if(!scope.user)
                        return;
                    else {
                        if($window.confirm("尊敬的  "+scope.user.stuname+"  用户，您确定要退出系统吗？"))
                        {
                            $rootScope.user = null;
                            $location.path("/login");
                        }else
                            return;
                    }
                }

            }
        }
    }]);