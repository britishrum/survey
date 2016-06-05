module.exports = function(mongo) {
    [{name: 'admin', password: 'AeE7PhSbhem2'}].forEach(function(user){
        mongo.users.find(user,function(err, users){
            if (!users.length) {
                mongo.users.insert(user);
            }
        });
    });
};
