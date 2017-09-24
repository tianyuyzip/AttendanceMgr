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

        /**
         * 读取数据库，加载该课程的全部签到记录
         * @courseno：课程号
         * @signdate：签到日期
         * @begintime：课程开始时间
         * */
        function loadCourseSignedInfo(courseno,signdate,begintime){

            var deferred=$q.defer();
            var promise=deferred.promise;             //使AJAX异步加载变为同步，防止取不到值
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