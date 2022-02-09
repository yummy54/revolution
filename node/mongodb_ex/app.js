const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const mongoClient = require('mongodb').MongoClient
const app = express()
app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))

var db;
var databaseUrl = "mongodb://localhost:27017/";

const options = {useUnifiedTopology: true};

app.get('/', (req, res) => {
	res.send('Web Server Started~!!')
});

app.get('/find', (req, res) => {
	mongoClient.connect(databaseUrl, function(err, database){
		if(err != null){
			res.json({'count':0})
		}else{
			db = database.db('test')
      db.collection("things").find({}).toArray(function(err, result) {
				if(err) throw err
				console.log('result : ')
				console.log(result)
				res.json(JSON.stringify(result))
			})
		}
	})
});

app.get('/findOne', (req, res) => {
	mongoClient.connect(databaseUrl, function(err, database){
		if(err != null){
			res.json({'count':0})
		}else{
			db = database.db('test')
      db.collection("things").findOne({}, function(err, result) {
				if(err) throw err
        console.log('result : ')
				console.log(result)
				res.json(JSON.stringify(result))
			})
		}
	})
});

app.get('/findSome', (req, res) => {
	mongoClient.connect(databaseUrl, function(err, database){
		if(err != null){
			res.json({'count':0})
		}else{
			db = database.db('test')
      db.collection("things").find({}, { projection: { _id: 0, n: 1, m: 1 } }).toArray(function(err, result) {
				if(err) throw err
        console.log('result : ')
				console.log(result)
				res.json(JSON.stringify(result))
			})
		}
	})
});

app.get('/projection1', (req, res) => {
	mongoClient.connect(databaseUrl, function(err, database){
		if(err != null){
			res.json({'count':0})
		}else{
			db = database.db('test')
      db.collection("things").find({}, { projection: { empno: 0 } }).toArray(function(err, result) {
				if(err) throw err
        console.log('result : ')
				console.log(result)
				res.json(JSON.stringify(result))
			})
		}
	})
});

app.get('/projection2', (req, res) => {
	mongoClient.connect(databaseUrl, function(err, database){
		if(err != null){
			res.json({'count':0})
		}else{
			db = database.db('test')
			db.collection("things").find({}, { projection: { _id: 0, mb_level: 0 } }).toArray(function(err, result) {
				if(err) throw err
        console.log('result : ')
				console.log(result)
				res.json(JSON.stringify(result))
			})
		}
	})
});

app.get('/projection3', (req, res) => {
	mongoClient.connect(databaseUrl, function(err, database){
		if(err != null){
			res.json({'count':0})
		}else{
			db = database.db('test')
			db.collection("things").find({}, { projection: { _id: 0 } }).toArray(function(err, result) {
				if(err) throw err
        console.log('result : ')
				console.log(result)
				res.json(JSON.stringify(result))
			})
		}
	})
});

app.get('/result', (req, res) => {
	mongoClient.connect(databaseUrl, function(err, database){
		if(err != null){
			res.json({'count':0})
		}else{
			db = database.db('test')
			db.collection("things").find({}, { projection: { empno: 1, ename: 1 } }).toArray(function(err, result) {
				if(err) throw err
        console.log('result : ')
				console.log(result[2].ename);
				res.json(JSON.stringify(result))
			})
		}
	})
});

app.get('/limit', (req, res) => {
	mongoClient.connect(databaseUrl, function(err, database){
		if(err != null){
			res.json({'count':0})
		}else{
			db = database.db('test')
			db.collection("things").find().limit(5).toArray(function(err, result) {
				if(err) throw err
        console.log('result : ')
				console.log(result);
				res.json(JSON.stringify(result))
			})
		}
	})
});

app.listen(app.get('port'), () =>{
	console.log('3000 Port : 서버 실행 중')
});
