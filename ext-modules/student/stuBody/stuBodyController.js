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
                updateSignCntInTitle(resp.data.result[0]);
            })
        }

        function updateSignCntInTitle(info) {
            // console.log(info);
            $scope.$parent.$applyAsync(function() {
                $scope.$parent.absentcnt = info.absentcnt;
                $scope.$parent.normalcnt = info.normalcnt;
                $scope.$parent.latecnt = info.latecnt;
                $scope.$parent.totlecnt = info.absentcnt+info.normalcnt+info.latecnt;
            });
        }

        $scope.addSigninfo = function(info) {
            $http({
                method:"POST",
                url:"http://localhost/v1/stu/signinfo/info",
                params:{
                    info:info
                }
            }).then(
                function (resp) {
                    console.log(resp.data);
                }
            )
        }

        $scope.getSignedinfo= function (stuno,courseno,date,begintime) {
            $http({
                method:"GET",
                url:"http://localhost/v1/stu/signinfo/"+stuno+"/"+courseno+"/"+date+"/"+begintime
            }).then(
                function (resp) {
                     // console.log(resp);
                    if(resp.data.result!=1) {
                            $scope.status = resp.data.result[0].status;
                            $scope.signtime = resp.data.result[0].signtime;
                            console.log($scope);

                        if ($scope.status === 1) {
                            $scope.signStatus = "已签到";
                            $scope.signMark = "(正常)  签到时间 " + $scope.signtime;
                            console.log(1);
                        }else if ($scope.status === 2) {
                            $scope.signStatus = "已签到";
                            $scope.signMark = "(迟到)  签到时间 " + $scope.signtime;
                            console.log(2);
                        }
                    }
                }
            )
        }

    }]);