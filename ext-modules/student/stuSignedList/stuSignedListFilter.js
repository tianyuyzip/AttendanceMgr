"use strict";

angular.module("stuMain")
    .filter("combineSearch",function () {
        
        return function (records,date,coursename) {
            var temp = new Array();

            angular.forEach(records,function (record) {
                if(date && coursename) {
                    if (record.signdate === date && record.coursename.includes(coursename)) {
                        temp.push(record);
                    }
                }
                else if(record.signdate === date || record.coursename.includes(coursename)){
                            temp.push(record);
                     }
            })
            // console.log(temp);
            return temp;
        }
    });