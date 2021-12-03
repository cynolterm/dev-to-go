const authMW = require('../middleware/util/authMW');
const checkPwMW = require('../middleware/util/checkPwMW');

const getUsersMW = require('../middleware/users/getUsersMW');
const getUserByIdMW = require('../middleware/users/getUserByIdMW');
const saveUserMW = require('../middleware/users/saveUserMW');
const delUserMW = require('../middleware/users/delUserMW');
const returnSingleUser = require("../middleware/users/returnSingleUserMW");

const UserModel = require('../models/user');

module.exports = function(app) {
    const objectRepository = {
        UserModel: UserModel
    }

    app.get('/api/users',
        getUsersMW(objectRepository));

    app.post('/api/users',
        saveUserMW(objectRepository));

    app.post('/api/auth/login',
        checkPwMW(objectRepository));

    app.post('/api/auth/logout',
        //authMW(objectRepository),
        //TODO
        );

    app.get('/api/users/:userid',
        getUserByIdMW(objectRepository),
        returnSingleUser(objectRepository));

    app.put('/api/users/:userid',
        getUserByIdMW(objectRepository),
        saveUserMW(objectRepository));

    app.delete('/api/users/:userid', 
        getUserByIdMW(objectRepository),
        delUserMW(objectRepository)
        );
}