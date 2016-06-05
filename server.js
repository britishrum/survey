var express = require('express');
var app = express();
var env = process.env;

var databaseUrl = "admin:AeE7PhSbhem2@localhost/surveyapp";
var collections = ["questions", "answers", "users"];
var mongo = require("mongojs")(databaseUrl, collections);
var bodyParser = require('body-parser');

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
    function(req, res){
        res.sendFile(__dirname + '/client/html/report.html');
    }
);

app.get('/answers',
    passport.authenticate('basic', {session: false}),
    function(req, res) {
        mongo.answers.find(function(err, answers){
            res.json(answers);
        });
    }
);

app.get('/survey', function(req, res) {
    res.sendFile(__dirname + '/client/html/survey.html');
});

app.get('/questions', function(req, res) {
    var questions = {};
    if (req.query.lang == 'ru') {
        questions = require('./questions/ru.json');
    } else {
        questions = require('./questions/en.json');
    }
	res.json(questions);
});

app.post('/submit', function(req, res){
	mongo.answers.insert(req.body.result);
    res.json({"status":"success"});
});

app.get('/health', function(req, res){
    res.status(404).end();
});

app.use('/', function(req, res) {
    res.sendFile(__dirname + '/client/html/survey.html');
});

app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function() {
    console.log('Survey app listening on port '+ env.NODE_PORT || 3000);
});
