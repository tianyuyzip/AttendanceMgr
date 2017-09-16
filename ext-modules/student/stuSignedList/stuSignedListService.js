"use strict";

angular.module("stuMain")
    .factory("stuSignedListService",function ($http,$q) {

        function loadAllSignedRecord(stuno){

            var deferred=$q.defer();
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