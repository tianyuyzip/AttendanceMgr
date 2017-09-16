"use strict";

angular.module("stuMain")
    .directive("stuSignedList",["$rootScope","$http","$location","$filter","$q","stuSignedListService",
        function ($rootScope,$http,$location,$filter,$q,stuSignedListService) {

        return {
            restrict: "AE",
            replace: true,
            scope: {},
            controller:"stuSignedListCtrl",
            templateUrl: "ext-modules/student/stuSignedList/stuSignedListTemplate.html",
            link: function (scope, el, attrs, ctrl) {

                var records = null;

                (function () {
                    // console.log($rootScope.user);
                    if (!$rootScope.user) {
                        $location.path("/login");
                    } else {
                        console.log(scope);
                        stuSignedListService.loadAllSignedRecord($rootScope.user.stuno).then(
                            function(result){
                                // console.log(result);
                                records = result;
                                scope.recordList = result;
                            }
                        )
                        $("[data-toggle='tooltip']").tooltip();
                    }
                })();

                var patt = /^[0-9]{1,2}-[0-9]{2}$/;

                // console.log($(el).find("button"));
                $(el).find("button").on("click",function () {

                    // console.log("click me");
                    if (scope.qryDate) {

                        if (!patt.test(scope.qryDate)) {
                            alert("请输入正确的日期格式！");
                            return;
                        }
                    }
                    if (scope.qryDate || scope.qryCourseName) {

                        scope.$applyAsync(function () {
                            scope.recordList = $filter("combineSearch")(records, scope.qryDate, scope.qryCourseName);
                        });
                        // console.log(scope.recordList);
                    }
                    else{
                        scope.$applyAsync(function () {
                            scope.recordList = records;
                        });
                    }

                });
                }
            }
    }]);