"use strict";

angular.module("stuMain")
    .controller("stuMessageCtrl",["$rootScope","$scope","$location","$http",
        function ($rootScope,$scope,$location,$http) {
        (function () {                          //判断登陆
            if(!$rootScope.user){
                $location.path("/stuMain");
            }
        })();
        $scope.stuname = $rootScope.user.stuname;

        /**
         * 返回主页面
         * */
        $scope.back = function () {
            $location.path("/stuMain");
        }

        /**
         * 设置新密码，更新数据库
         * 修改成功后自动退出要求重新登陆
         * */
        $scope.setNewPassword = function (stuno,password) {
            $http({
                method:"GET",
                url:"http://localhost/v1/stu/"+stuno+"/"+password
            }).then(function (resp) {
                if(resp.data.result==0){
                    $location.path("/login");
                }
            })
        }
    }]);