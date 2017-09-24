"use strict";

angular.module("login")
       .controller("loginControl",["$scope","$location","$rootScope","$http"
           ,function ($scope,$location,$rootScope,$http) {

            $scope.isLogined = false;  //判断是否登录
            $scope.errormsg = "";      //出错提示信息

               /**
                * 登陆检测
                * 密码不能为空，密码是否正确
               * */
            $scope.loginCheck = function(){
                var username = $scope.username;
                var password = $scope.password;
                var identify = $scope.identify;

               if(!username){
                    $scope.errormsg="用户名不能为空";
                    return;
               }
               if(!password){
                   $scope.errormsg="密码不能为空";
                   return;
               }
               if(identify==="1"){                  //如果是学生 则去读数据库并判断密码是否正确

                    $http({
                        method:"GET",
                        url:"http://localhost/v1/stu/"+$scope.username
                    }).then(
                            function (resp) {
                                // console.log(resp.data.result);
                                if(resp.data.result!==1) {
                                    var stu = resp.data.result;
                                    if(typeof stu !="undefined"){
                                        if (stu.stuno === username && stu.password === password) {
                                            $rootScope.user=stu;
                                            $location.path("/stuMain");
                                        }
                                    }
                                }
                                $scope.$applyAsync(function() {
                                    $scope.errormsg = "用户名或密码输入错误！";
                                });
                            }
                        );
               }
           }

       }]);