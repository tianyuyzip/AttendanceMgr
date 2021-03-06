"use strict";

angular.module("stuMain")
    .directive("stuSignedList",["$rootScope","$http","$location","$filter","$q","stuSignedListService",
        function ($rootScope,$http,$location,$filter,$q,stuSignedListService) {

        return {
            restrict: "AE",
            replace: true,
            require:"^stuMain",
            templateUrl: "ext-modules/student/stuSignedList/stuSignedListTemplate.html",
            link: function (scope, el, attrs, ctrl) {

                var records = null;

                scope.pageNo = 1;       //当前第几页
                scope.pageSize = 6;     //每页显示多少条记录
                scope.isFirst = true;  //是否是第一页
                scope.totlecnt = ctrl.getTotleCnt();      //获取总记录数
                //设置总页数
                scope.totalPage = ctrl.getTotleCnt()%scope.pageSize==0?ctrl.getTotleCnt()/scope.pageSize:parseInt(ctrl.getTotleCnt()/scope.pageSize)+1;
                scope.hasList = true;       //用于ng-if判断列表是否有记录

                //如果没登陆 去登陆界面
                (function () {
                    // console.log($rootScope.user);
                    if (!$rootScope.user) {
                        $location.path("/login");
                    } else {
                        // console.log(scope);
                        /**
                         * stuSignedService ：自定义服务
                         * loadsScopedSignedRecord: 分页加载记录
                         * */
                        stuSignedListService.loadScopedSignedRecord($rootScope.user.stuno,scope.pageNo,scope.pageSize).then(
                            function(result){
                                // console.log(result);             //加载历史签到记录
                                records = result;
                                scope.recordList = result;
                            }
                        )
                        $("[data-toggle='tooltip']").tooltip();       //设置提示信息
                    }
                })();

                var patt = /^[0-9]{1,2}-[0-9]{2}$/;               //日期查询条件正则表达式
                                                                   //xx-xx

                /**
                 * 组合条件查询
                 * */
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
                            if($filter("combineSearch")(scope.recordList, scope.qryDate, scope.qryCourseName).length>0)
                                scope.recordList = $filter("combineSearch")(scope.recordList, scope.qryDate, scope.qryCourseName);
                            else
                                scope.hasList = false;
                        });
                        // console.log(scope.recordList);
                    }
                    else{
                        scope.$applyAsync(function () {
                            scope.hasList=true;
                            scope.recordList = records;
                        });
                    }

                });

                /**
                * 分页 去第一页
                * */
                scope.toFirst = function () {
                    scope.pageNo = 1;
                    if(scope.pageNo===1){
                        scope.isLast=false;
                        scope.isFirst=true;
                    }
                    stuSignedListService.loadScopedSignedRecord($rootScope.user.stuno,1,scope.pageSize).then(
                        function(result){
                            records = result;
                            scope.recordList = result;
                        }
                    )
                    console.log("toFirst"+scope.isFirst);
                };

                var pageSize = null;

                /**
                 * 分页 下一页 /上一页
                 * */
                scope.toLoadPage = function (pageNo) {
                    if(pageNo<1||pageNo>scope.totalPage){
                        return;
                    }
                    if(pageNo>1&&pageNo<scope.totalPage){
                        scope.isFirst = false;
                        scope.isLast = false;
                    }
                    if(pageNo==1){
                        scope.isFirst=true;
                        scope.isLast=false;
                    }
                    if(pageNo===scope.totalPage){
                        scope.pageNo = pageNo;
                        scope.isLast = true;
                        scope.isFirst = false;
                        pageSize = scope.totlecnt - (pageNo-1)*scope.pageSize;
                        stuSignedListService.loadScopedSignedRecord($rootScope.user.stuno,pageNo,pageSize).then(
                            function(result){
                                records = result;
                                scope.recordList = result;
                            }
                        )
                    }else{
                        scope.pageNo = pageNo;
                        scope.isFirst=false;
                        scope.isLast=false;
                        stuSignedListService.loadScopedSignedRecord($rootScope.user.stuno,pageNo,scope.pageSize).then(
                            function(result){
                                records = result;
                                scope.recordList = result;
                            }
                        )
                    }

                };

                /**
                 * 分页 去最后一页
                 * */
                scope.toLast = function () {
                    scope.pageNo = scope.totalPage;
                    scope.isLast = true;
                    scope.isFirst= false;
                    stuSignedListService.loadScopedSignedRecord($rootScope.user.stuno,scope.pageNo,scope.pageSize).then(
                        function(result){
                            records = result;
                            scope.recordList = result;
                        }
                    )

                    console.log("toLast"+scope.isFirst);
                };

                /**
                 * 跳转到指定页码
                * */
                scope.jumpPage = function (pageNo) {
                    if(pageNo<1 || pageNo>scope.totalPage){
                        alert("请输入【1-"+scope.totalPage+"】有效页号。");
                    }else if(pageNo==scope.totalPage){
                        scope.pageNo = pageNo;
                        scope.isLast = true;
                        scope.isFirst = false;
                        pageSize = scope.totlecnt - (pageNo-1)*scope.pageSize;
                        stuSignedListService.loadScopedSignedRecord($rootScope.user.stuno,pageNo,pageSize).then(
                            function(result){
                                records = result;
                                scope.recordList = result;
                            }
                        )
                    }else{
                        scope.pageNo = pageNo;
                        stuSignedListService.loadScopedSignedRecord($rootScope.user.stuno,pageNo,scope.pageSize).then(
                            function(result){
                                records = result;
                                scope.recordList = result;
                            }
                        )
                    }
                }
            }
        }
    }]);