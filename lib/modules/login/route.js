var loginRoute = (function () {


    const loginRoute = require('express').Router();

    loginRoute.route('/')
        .post(require('./methods/auth'));

    return loginRoute;

})();
module.exports = loginRoute;