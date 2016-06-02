var express = require('express');
var app = express();

var databaseUrl = "surveyDb";
var collections = ["questions", "answers", "users"];
var mongo = require("mongojs")(databaseUrl, collections);

var passport = require('passport');
var basicStrategy = require('passport-http');

console.log(basicStrategy);

app.use('/static', express.static(__dirname + '/client'));

app.get('/survey', function(req, res) {

});

app.get('/login', function(req, res, next) {

});

app.use('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(81, function() {
    console.log('Survey app listening on port 81');
});
