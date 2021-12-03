module.exports = function (objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.user === 'undefined') {
            return res.json({});
        }

        res.locals.user.remove(err => {
            if (err) {
                return res.json({});
            }
            return res.json({});
        });
    };
};