"use strict";

angular.module("stuMain")
    .factory("stuCourseSignedService",function ($http,$q) {
       var obj = {};
       var courseService = {};

        /**
         * 定义传递数据的set函数
         * @param {type} xxx
         * @returns {*}
         * @private
         */
        var _set = function (data) {
            obj = data;
        };

        /**
         * 定义获取数据的get函数
         * @param {type} xxx
         * @returns {*}
         * @private
         */
        var _get = function () {
            return obj;
        };

        // Public APIs
        courseService.set = _set;
        courseService.get = _get;

        function loadCourseSignedInfo(courseno,signdate,begintime){

            var deferred=$q.defer();
            var promise=deferred.promise;
            $http({
                        method:"POST",
                        url:"http://localhost/v1/stu/signinfo/course",
                        params:{
                            courseno:courseno,
                            signdate:signdate,
                            begintime:begintime
                        }
                    }).then(function (resp) {
                    deferred.resolve(resp.data.result);
                },
                function (data) {
                    deferred.reject();
                });
            // console.log(promise);
            return promise;
        }

        // 在controller中通过调set()和get()方法可实现提交或获取参数的功能
        return {
            courseService:courseService,
            loadCourseSignedInfo:loadCourseSignedInfo
        }
    });