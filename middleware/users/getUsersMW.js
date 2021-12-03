requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');
    
    return function (req, res, next) {
        UserModel.find({}, (err, users) => {
            if (err) {
                res.json({"error": err})
            }

            res.locals.users = users;
            res.json({"users": users});
        });
    };
};