module.exports = function (objectrepository) {
    return function(req, res, next) {
        // if (typeof req.session.belepve === 'undefined' || req.session.belepve !== true) {
        //     return res.
        // }

        next();
    };
};