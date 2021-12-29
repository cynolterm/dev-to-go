requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');
    
    return function (req, res, next) {
        UserModel.find({}, (err, users) => {
            if (err) {
                res.json({"error": err})
            }

            let developers = [];
            users.map(user => {
                if(user.developer) {
                    user.password = "";
                    developers.push(user)
                }
            });

            res.locals.users = developers;
            res.json({"users": developers});
        });
    };
};