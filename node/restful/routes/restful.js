const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const users = [
  { id:1, name: "User1"},
  { id:2, name: "User2"},
  { id:3, name: "User3"},
];

app.get("/Hello", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
