#!/bin/bash
PATH=/usr/local/bin:/usr/local/sbin:~/bin:/usr/bin:/bin:/usr/sbin:/sbin

python3 /data/gongju/parking_scraper.py

mongoimport -d test -c gongju --headerline --type csv /data/gongju/gongju.csv
