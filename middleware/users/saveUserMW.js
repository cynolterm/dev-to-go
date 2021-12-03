requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        // if (
        //     typeof req.body.name === 'undefined'
        // ) {
        //     return next();
        // }

        if (typeof res.locals.user === 'undefined') {
            res.locals.user = new UserModel();
            res.locals.user.username = req.body.username;
            res.locals.user.password = req.body.password;
            res.locals.user.developer = false;
            res.locals.user.skills = [];
            res.locals.user.location = "";
            res.locals.user.name = "";
            res.locals.user.description = "";
            res.locals.user.wage = "";
            res.locals.user.contact = "";
        }

        if (req.body.skills) {
            let temp = req.body.skills.split(";")
            res.locals.user.skills.push({Name: temp[0], Level: temp[1]});
            res.locals.user.developer = true;
        }

        if (req.body.location) {
            res.locals.user.location = req.body.location;
        }

        if (req.body.name) {
            res.locals.user.name = req.body.name;
        }

        if (req.body.description) {
            res.locals.user.description = req.body.description;
        }

        if (req.body.wage) {
            res. locals.user.wage = req.body.wage;
        }

        if (req.body.contact) {
            res.locals.user.contact = req.body.contact;
        }

        //res.locals.user.name = req.body.name;

        // if(req.body.car){
        //     res.locals.cars.forEach(car => {
        //         if(req.body.car.includes(car._id)){
        //             res.locals.customer._rentedcar = car._id;
        //             res.locals.customer.rentedcarmodel = car.model;
        //             CarModel.findOne({ _id: car._id }, (err, car) => {
        //                 if (err || !car) {
        //                     return next(err);
        //                 }
        //                 car.available = false;
        //                 car.save();
        //             });
        //         }
        //     })
        // }
        // else if(res.locals.customer._rentedcar){
        //     CarModel.findOne({ _id: res.locals.customer._rentedcar }, (err, car) => {
        //         if (err || !car) {
        //             return next(err);
        //         }
        //         car.available = true;
        //         car.save();
        //     });
        //     res.locals.customer._rentedcar = undefined;
        //     res.locals.customer.rentedcarmodel = '';
        // }

        res.locals.user.save(err => {
            if (err) {
                return next(err);
            }

            return res.json({});
        });
    };
};