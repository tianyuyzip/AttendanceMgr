"use strict";

angular.module("attApp")
       .config(["$routeProvider",function ($routeProvider) {

           var routes = [
               {
                   url:"/login",
                   config:{
                        template:"<login></login>"
                   }
               },
               {
                   url:"/stuMain",
                   config:{
                       template:"<stu-main></stu-main>"
                   }
               }
           ];

           routes.forEach(function(route){
              $routeProvider.when(route.url,route.config);
           });

           $routeProvider.otherwise({redirectTo:"/login"});
       }]);