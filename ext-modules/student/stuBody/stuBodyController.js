"use strict"

angular.module("stuMain")
    .controller("stuBodyCtrl",["$scope","$http",function ($scope,$http) {
        /**
         * 通过xx：xx字符串获得时间毫秒
         * */
        $scope.getTimes = function (date) {
            var time = new Date();
            time.setHours(date.split(":")[0]);
            time.setMinutes(date.split(":")[1]);

            return time.getTime();
        }
        
        $scope.updateSignCnt = function (stuno,status) {
            $http({
                method:"GET",
                url:"http://localhost/v1/stu/signCnt/"+stuno+"/"+status
            }).then(function (resp) {
                console.log(resp);
            })
        }

    }]);