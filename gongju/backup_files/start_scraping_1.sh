#!/bin/bash

python /data/gongju/parking_scraper.py

mongoimport -d test -c gongju --headerline --type csv /data/gongju/gongju.csv

