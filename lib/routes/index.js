(function (applicationRoutes) {

    applicationRoutes.init = function (app) {
        const userRoutes=require('../modules/user/route');
        app.use('/api/user', userRoutes);
    }

})(module.exports)