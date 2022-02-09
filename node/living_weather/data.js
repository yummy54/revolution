var request = require('request');


var keys='B%2FNiJnYmkZV1%2FK7ulvZI4MoSXvCTDfNAd0Snw%2Bk6g4%2BbMk1LoGVhd75DJahjv4K35Cr9jh9RX0j%2BM89grKBYsw%3D%3D'

var url = 'http://apis.data.go.kr/1360000/LivingWthrIdxServiceV2/getUVIdxV2';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + keys; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */
//queryParams += '&' + encodeURIComponent('areaNo') + '=' + encodeURIComponent('1100000000'); /* */
queryParams += '&' + encodeURIComponent('areaNo') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('time') + '=' + encodeURIComponent('2022011718'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});
