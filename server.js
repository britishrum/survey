var express = require('express');
var app = express();

var databaseUrl = "surveyDb";
var collections = ["questions", "answers", "users"];
var mongo = require("mongojs")(databaseUrl, collections);

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

});

app.use('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(81, function() {
    console.log('Survey app listening on port 81');
});
