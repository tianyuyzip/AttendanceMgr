"use strict";

angular.module("stuMain")
    .factory("stuSignedListService",function ($http,$q) {

        /**
         * 从数据库加载学生所有签到记录
         * */
        function loadAllSignedRecord(stuno){

            var deferred=$q.defer();                //同步
            var promise=deferred.promise;
            $http({
                method: "GET",
                url: "http://localhost/v1/stu/signinfo/" + stuno
            }).then(function (resp) {
                    deferred.resolve(resp.data.result);
                },
            function (data) {
                deferred.reject();
            });
            // console.log(promise);
            return promise;
        }

        /**
         * 分页加载此学生签到记录
         * @stuno: 学生学号
         * @pageNo: 加载的页号
         * @pageSize: 每页记录数
         * */
        function loadScopedSignedRecord(stuno,pageNo,pageSize) {

            var deferred=$q.defer();
            var promise=deferred.promise;
            $http({
                method: "GET",
                url: "http://localhost/v1/stu/signinfo/" + stuno+"/"+pageNo+"/"+pageSize
            }).then(function (resp) {
                    deferred.resolve(resp.data.result);
                },
                function (data) {
                    deferred.reject();
                });
            // console.log(promise);
            return promise;

        }

        return {
            loadAllSignedRecord:loadAllSignedRecord,
            loadScopedSignedRecord:loadScopedSignedRecord
        }

    });