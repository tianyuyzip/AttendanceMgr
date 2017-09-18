"use strict";

angular.module("stuMain")
    .directive("stuHeader",["$rootScope","$location","$window",function ($rootScope,$location,$window) {
        return{
            restrict:"AE",
            replace:true,
            controller:"stuHeaderCtrl",
            templateUrl:"ext-modules/student/stuHeader/stuHeaderTemplate.html",
            link:function (scope,el,attrs,ctrl) {
                    scope.user = $rootScope.user;
                    scope.loadAllAttHistoryCnt(scope.user.stuno,scope.user.stuname);

                // scope.loadAllSignedRecord = function () {
                //     $location.path("/stuSignedList");
                // };
                scope.loadAllSignedRecord = function () {
                    scope.showSignedList = true;
                }

                scope.toMainPage = function () {
                    // $location.path("/stuMain");
                    scope.showSignedList = false;
                };

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