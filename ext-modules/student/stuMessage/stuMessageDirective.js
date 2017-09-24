"use strict";

angular.module("stuMain")
    .directive("stuMessage",["$rootScope",function ($rootScope) {
       return{
           restrict:"AE",
           replace:true,
           controller:"stuMessageCtrl",
           templateUrl:"ext-modules/student/stuMessage/stuMessageTemplate.html",
           link:function (scope,el,attrs,ctrl) {

               /**
                * 点击修改按钮，检查输入信息
                * */
               scope.updatePassword = function () {
  /*                 console.log(scope.originPassword);
                   console.log($rootScope.user.password);*/
                   if(scope.originPassword!==$rootScope.user.password){
                       $(el).find("#errorMessage").html("原始密码不正确，重新输入") ;
                       return;
                   }
                   else if(!scope.newPassword || !scope.verify){
                       $(el).find("#errorMessage").html("请输入新密码");
                   }
                   else if(scope.newPassword !== scope.verify){
                       $(el).find("#errorMessage").html("两次密码输入不一致，重新输入");
                       return;
                   }
                   else if(scope.verify ===$rootScope.user.password){
                       $(el).find("#errorMessage").html("与原始密码一致。");
                       return
                   }else{
                        scope.setNewPassword($rootScope.user.stuno,scope.verify);    //修改密码
                   }
               }
           }
       }
    }]);