requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        if (typeof req.body.password === 'undefined') {
            return next();
        }

        UserModel.findOne({ username: req.body.username }, (err, user) => {
            if (err || !user) {
                return next(err);
            }
            if (user.password !== req.body.password) {
                return next(err);
            }

            res.json({"token": "token"})
            return;
        });
    };
};