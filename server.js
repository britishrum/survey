var express = require('express');
var app = express();

var databaseUrl = "surveyDb";
var collections = ["questions", "answers", "users"];
var mongo = require("mongojs")(databaseUrl, collections);

app.use('/static', express.static(__dirname + '/client'));

app.get('/survey', function(req, res) {

});

app.use('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(81, function() {
    console.log('Survey app listening on port 81');
});
