#!/bin/bash
PATH=/usr/local/bin:/usr/local/sbin:~/bin:/usr/bin:/bin:/usr/sbin:/sbin

mongo < find_avg.sql

mongoexport -d test -c parking_avg -f floor,date,hour,avg_num --type=csv -o /data/gongju/parking.csv

#db='mysql --local_infile=1 -u root -1234 --database=gongju'
db='mysql --local_infile=1 -h mymysql.cxmyrmxomyz9.ap-northeast-2.rds.amazonaws.com -P 3306 -u admin -pabcd1234 --database=gongju'
cat import_mysql.sql | $db
