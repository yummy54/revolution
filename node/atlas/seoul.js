var axios = require('axios');
var data = JSON.stringify({
    "collection": "seoul",
    "database": "testdb",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 0,
        "시군구": 1,
        "번지": 1,
        "단지명": 1,
        "전용면적": 1,
        "계약일": 1,
        "거래금액(만원)": 1,
        "층": 1,
        "건축년도": 1,
        "도로명": 1
    }
});

var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-utvgh/endpoint/data/beta/action/findOne',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'WQLYBebRekMeJ47lKtjdA3del0emTIyFpIgRJGUd3zHwCCkIql8sCUuTxNuOnaHc'
    },
    data : data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
