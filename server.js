var express = require('express');
var questions = require('./questions.js');
var app = express();

app.use('/static', express.static(__dirname + '/client'));


//survey
app.get('/survey', function(req, res) {
	res.sendFile(__dirname + '/client/survey.html');
});

app.get('/questions', function(req, res) {
	res.json(questions.foo());
});

app.post('/submit', function(req, res){
	res.sendFile(__dirname + '/client/survey.html');
});



app.use('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(81, function() {
    console.log('Survey app listening on port 81');
});

