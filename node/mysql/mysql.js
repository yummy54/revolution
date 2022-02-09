var express    =  require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'mymysql.cuvhlu9ntczw.ap-northeast-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'abcd1234',
  database : 'st_db'
});
var app = express();

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");
} else {
    console.log("Error connecting database ... \n\n");
}
});

app.get("/",function(request,response){
connection.query('SELECT * from st_info', function(err, rows, fields) {
connection.end();
  if (!err){
    response.send(rows);
    console.log('The solution is: ', rows);
  }
  else
    console.log('Error while performing Query.');
  });
});

app.listen(8080, function () {
  console.log('8080 Port : 서버 실행 중');
});
