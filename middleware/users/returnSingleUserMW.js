module.exports = function (objectrepository) {

    return function(req, res, next) {
        res.json(res.locals.user);
        return;
    };
};