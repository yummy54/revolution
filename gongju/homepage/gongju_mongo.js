const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const mysql = require('mysql');
var http = require('http');
const mongoClient = require('mongodb').MongoClient
const app = express()
app.set('port', process.env.PORT || 3000)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(morgan('dev'))

// mongo
var db;
var databaseUrl = 'mongodb://3.35.103.171:27017/'

// mysql

// MainPage
app.get('/', (req,res) => {
   res.render('index.html');
});

// T1 주차장

app.get('/T1', (req,res) => {
   mongoClient.connect(databaseUrl, function(err, database){
      if(err != null){
         res.json({'count':0})
      }else{
         var query = {floor : /^T1/};
         db = database.db('test')
         db.collection('gongju').find(query).toArray(function(err, result){
            if(err){
               throw err;
            }
            res.render('gongju.html', { data : result });
         })
      }
   });
});

// T2 주차장
app.get('/T2', (req,res) => {
   mongoClient.connect(databaseUrl, function(err, database){
      if(err != null){
         res.json({'count':0})
      }else{
         var query = {floor : /^T2/};
         db = database.db('test')
         db.collection('gongju').find(query).toArray(function(err, result){
            if(err){
               throw err;
            }
            res.render('gongju.html', { data : result });
         })
      }
   });
});

// MYSQL 평균 그래프
app.all("/list", (req,res) => {
      const mysqlClient = mysql.createConnection({
          host: "mymysql.cxmyrmxomyz9.ap-northeast-2.rds.amazonaws.com",
          user: "admin",
          password: "abcd1234",
          database: "gongju"
      });

    var floor_id = req.query.floor;
      var _query;
      if (floor_id != null){
         _query = 'select avg_num from parking where floor = "'
         _query += floor_id;
         _query += '" order by date desc, hour limit 24';
      }else{
         _query = 'select * from parking limit 24';
      }
      // console.log(_query);

   mysqlClient.query(_query , function(err, rows){
      mysqlClient.end();
         var data_list = [];
         for(var i=0; i < rows.length; i++){
            data_list.push(rows[i].avg_num);
         }
         // console.log(data_list);
      if(!err){
         // res.render('mysql.html', { sqldata : data_list });
             var template = `
             <!DOCTYPE html>
             <html>
             <head>
               <meta charset="UTF-8">
               <meta http-equiv="X-UA-Compatible" content="IE=edge">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <title> GongJu</title>
               <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
               <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
               <style type="text/css">
                   body {
                     text-align : center;
                   }

                   .center {
                     margin : auto;
                     text-align : center;
                   }

               </style>

             </head>

             <body>
               <div class="chart-container center" style="position: relative; width:100%">
                   <canvas id="myChart"></canvas>
               </div>

               <script>
                   const ctx = document.getElementById('myChart').getContext('2d');
                   const myChart = new Chart(ctx, {
                       type: 'line',
                       data: {
                           labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                           datasets: [{
                               label: '어제자 평균 주차 수',
                               data: [${data_list}],
                               backgroundColor: [
                                   'rgba(255, 99, 132, 0.2)',
                                   'rgba(54, 162, 235, 0.2)',
                                   'rgba(255, 206, 86, 0.2)',
                                   'rgba(75, 192, 192, 0.2)',
                                   'rgba(153, 102, 255, 0.2)',
                                   'rgba(255, 159, 64, 0.2)'
                               ],
                               borderColor: [
                                   'rgba(255, 99, 132, 1)',
                                   'rgba(54, 162, 235, 1)',
                                   'rgba(255, 206, 86, 1)',
                                   'rgba(75, 192, 192, 1)',
                                   'rgba(153, 102, 255, 1)',
                                   'rgba(255, 159, 64, 1)'
                               ],
                               borderWidth: 1
                           }]
                       },
                       options: {
                           scales: {
                               y: {
                                   beginAtZero: true
                               }
                           }
                       }
                   });
               </script>


             </body>
             </html>


             `;
           res.end(template);
      }
      else
         console.log('Error while performing Query.');
   });
	 // res.render('gongju.html')
});


app.listen(app.get('port'), () =>{
   console.log('서버 실행 중')

});
