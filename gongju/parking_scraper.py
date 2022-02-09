# import library
import requests
import bs4
import pandas as pd
import schedule
import time
import os
import warnings

warnings.filterwarnings('ignore')

## 공공데이터 받아서 csv로 저장하는 함수
def get_parking_data():

    ## 공공데이터 API XML 받아오기
    url = 'http://openapi.airport.kr/openapi/service/StatusOfParking/getTrackingParking'
    params ={'serviceKey' : 'obo3NLKCOKTh7dl37Df5M9Ke+F8HpDedwqdNHhiVesI8nfLejJzOGHuuEQVRoLJ3t26GBQ3tt6hFeW9tKOXgng==', 'pageNo' : '1', 'numOfRows' : '20' }
    response = requests.get(url, params=params).text.encode('utf-8')
    xml = bs4.BeautifulSoup(response, 'lxml')
    rows = xml.findAll('item')

    rowList = []
    nameList = []
    columnList = []

    ## 데이터를 데이터프레임 안에 넣기
    rowsLen = len(rows)
    for i in range(0, rowsLen):
        columns = rows[i].find_all()

        columnsLen = len(columns)
        for j in range(0, columnsLen):
            if i == 0:
                nameList.append(columns[j].name)
            eachColumn = columns[j].text
            columnList.append(eachColumn)
        rowList.append(columnList)
        columnList = []

    result = pd.DataFrame(rowList, columns=nameList)

    ## 초단위 삭제
    for i in range(len(result)):
        result.loc[i][0] = result.loc[i][0][:-6]

    ## DateType으로 변경
    result['datetm'] = pd.to_datetime(result['datetm'])

    ## date 추출
    result['date'] = result['datetm'].dt.date
    ## hour 추출
    result['hour'] = result['datetm'].dt.hour
    ## minute 추출
    result['minute'] = result['datetm'].dt.minute

    ## '-'가 나오는 데이터 전처리
    result["parking"][10] = result["parking"][10].replace("-", "")
    
    convert_dict = {'parking': int,
                    'parkingarea': int }

    result = result.astype(convert_dict)

    ## csv로 저장
    os.chdir("/data/gongju")
    # print(os.getcwd() + " where")
    if not os.path.exists('gongju.csv'):
        # print(os.getcwd() + " not exist")
        ## 파일이름이 존재하지 않으면 그냥 저장
        result.to_csv("/data/gongju/gongju.csv", mode='w', index=False, encoding="utf-8")
    else:
        # print(os.getcwd() + " not exist")
        ## 존재하면 삭제하고 저장
#         result.to_csv("gongju.csv", mode='a', index=False, encoding="utf-8", header=False)
        #os.remove("gongju.csv")
        result.to_csv("/data/gongju/gongju.csv", mode='w', index=False, encoding="utf-8")

get_parking_data()
