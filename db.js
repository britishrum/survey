module.exports = function(mongo) {
    [{name: 'alan', password: 'qwerty'}].forEach(function(user){
        mongo.users.find(user,function(err, users){
            if (!users.length) {
                mongo.users.insert(user);
            }
        });
    });
};
