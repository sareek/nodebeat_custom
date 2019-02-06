var loginRoute = (function () {


    const loginRoute = require('express').Router(),
    passport=require('passport');

    loginRoute.route('/')
        .post(passport.authenticate('local',{session:false}),require('./methods/auth'));

    return loginRoute;

})();
module.exports = loginRoute;