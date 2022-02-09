const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongoose configuration
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var dynamic_mongo = require('./routes/dynamic_mongo.js');
app.use('/', dynamic_mongo);

app.listen(app.get('port'), () =>{
	console.log('3000 Port : 서버 실행 중')
});
