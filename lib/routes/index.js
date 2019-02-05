(function (applicationRoutes) {

    applicationRoutes.init = function (app) {

        const userRoutes = require('../modules/user/route');
        app.use('/api/user', userRoutes);

        const loginRoute = require('../modules/login/route');
        app.use('/api/auth', loginRoute);

    }

})(module.exports)