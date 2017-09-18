# AttendanceMgr
基于AngularJS的学生签到管理系统
## 教务考勤签到系统 ##
## 数据库设计说明
使用mongodb文档型数据库存储系统数据
### 实体说明：
- 学生：用于登录学生端，进行课程签到，保存学生个人信息
- 课程：保存课程信息
- 签到次数：保存学生各种签到状态的总次数
- 签到记录：学生签到课程生成一条签到记录，保存学生签到状态、签到时间，以及课程部分信息

### 文档说明：
- course{
    "_id" : ObjectId("59b5eb76da23a6a6fda8c805"),
    "courseno" : "c002",
    "coursename" : "计算机网络",
    "teaname" : "刘明",
    "begintime" : "10:00",
    "endtime" : "12:00",
    "date" : "9-16",
    "password" : "k3k68d"
}
- signCnt{
    "_id" : ObjectId("59b4a5a4da23a6a6fda8c802"),
    "stuno" : "s001",
    "stuname" : "王海",
    "normalcnt" : 6,
    "latecnt" : 9,
    "absentcnt" : 0.0
}
- signinfo{
    "_id" : ObjectId("59bcb4512adce02a60435481"),
    "stuno" : "s001",
    "stuname" : "王海",
    "courseno" : "c006",
    "coursename" : "大学英语",
    "signdate" : "9-16",
    "signtime" : "13:19",
    "begintime" : "12:30",
    "status" : 2
}
