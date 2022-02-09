var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;//query string 추출
    var title = queryData.id;
    console.log(title);
    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    var template = `
    <!doctype html>
    <html>
    <head>
      <title>WEB - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a></p>
      <p><img src="https://images.squarespace-cdn.com/content/v1/5c72d811d74562103adbe24c/1555785231144-9RV7LO1ER3IZ2MZN365T/code.JPG" height="60%" width="60%"></p>
      <p style="margin-top:20px;">HTML elements are the building blocks of HTML pages.</p>
    </body>
    </html>

   `;
    response.end(template);

});

app.listen(3000, function () {
  console.log('3000 Port : 서버 실행 중');
});
