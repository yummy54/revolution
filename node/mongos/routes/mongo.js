const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//define scheme
var userSchema = mongoose.Schema({
      userid: String,
      city : String,
      sex : String,
      age : Number
});

// create model with mongodb collection & scheme
var User = mongoose.model('users',userSchema);

// list
router.get('/list', function(req, res, next) {
      User.find({},function(err,docs){
           if(err) console.log('err');
           res.send(docs);
      });
});

// get
router.get('/get', function(req, res, next) {
      db = req.db;
      var userid = req.query.userid
      User.findOne({'userid':userid},function(err,doc){
           if(err) console.log('err');
            res.send(doc);
      });
});

// insert
router.post('/insert', function(req, res, next) {
      var userid = req.body.userid;
      var city = req.body.city;
      var sex = req.body.sex;
      var age = req.body.age;
      var user = new User({'userid':userid,'city':city,'sex':sex,'age':age});

      user.save(function(err,silence){
             if(err){
                console.log(err);
                res.status(500).send('update error');
                return;
             }
             res.status(200).send("Inserted");
         });
});

// update
router.post('/update', function(req, res, next) {
      var userid = req.body.userid;
      var city = req.body.city;
      var sex = req.body.sex;
      var age = req.body.age;
      User.findOne({'userid':userid},function(err,user){
           if(err){
               console.log(err);
               res.status(500).send('update error');
               return;
          }
           user.sex = sex;
           user.city = city;
           user.age = age;
           user.save(function(err,silence){
                  if(err){
                     console.log(err);
                     res.status(500).send('update error');
                     return;
                  }
                  res.status(200).send("Updated");
              });
      });
});

// delte
router.post('/delete', function(req, res, next) {
      var userid = req.body.userid;
      var user = User.find({'userid':userid});
      user.remove(function(err){
             if(err){
                console.log(err);
                res.status(500).send('update error');
                return;
             }
             res.status(200).send("Removed");
         });
});

module.exports = router;

// select * from users
User.find({}).exec(function(err,user){
      console.log("Query 1");
      console.log(user+"\n");
      return;
});

// select userid, city from users
User.find({},{'_id':0, 'userid':1, 'city':1}).exec(function(err,user){
      console.log("Query 2");
      console.log(user+"\n");
      return;
});

// select * from users where city='seoul' order by userid limit 3
User.find({'city':'seoul'}).sort({'userid':1}).limit(3).exec(function(err,users){
      console.log("Query 3");
      console.log(users+"\n");
      return;
});

// select userid from users where userid='/user/'
User.find({'userid':{'$regex':'user'}}).select('userid').exec(function(err,user){
      console.log("Query 4");
      console.log(user+"\n");
      return;
});

// using JSON doc query
// select userid,age from users where city='seoul' and age > 10 and age < 29
User.find({'city':'seoul', 'age':{$gt:10 , $lt:29}})
      .sort({'age':-1})
      .select('userid age')
      .exec(function(err,users){
           console.log("Query 5");
           console.log(users+"\n");
           return;
});

//using querybuilder
//select userid,age from users where city='seoul' and age > 10 and age < 29
User.find({})
      .where('city').equals('seoul')
      .where('age').gt(10).lt(29)
      .sort({'age':1})
      .select('userid age')
      .exec(function(err,users){
           console.log("Query 6");
           console.log(users+"\n");
           return;
});
