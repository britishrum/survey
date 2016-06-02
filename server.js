var express = require('express');
var questions = require('./questions.js');
var app = express();

var databaseUrl = "surveyDb";
var collections = ["questions", "answers", "users"];
var mongo = require("mongojs")(databaseUrl, collections);
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

require('./db.js')(mongo);

passport.use(new BasicStrategy(function(userid, password, done) {
    mongo.users.find({
        name: userid,
        password: password
    }, function(err, users) {
        if (err) { return done(err); }
        if (!users.length) { return done(null, false); }
        return done(null, users[0]);
    });
}));

app.use('/static', express.static(__dirname + '/client'));

app.get('/reports',
    passport.authenticate('basic', {session: false}),
    function(req, res) {
            res.json(req.user);
            // return reports page here
    }
);

app.get('/survey', function(req, res) {
	if (req.param('lang') == 'ru'){
		res.sendFile(__dirname + '/client/surveyru.html');
	}
	else {
		res.sendFile(__dirname + '/client/survey.html');
	}
});

app.get('/questions', function(req, res) {
	res.json(questions.getQuestions());
});

app.post('/submit', function(req, res){
	mongo.answers.insert(req.body.answers);
	res.json({"status":"success"});
});

app.use('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(81, function() {
    console.log('Survey app listening on port 81');
});
