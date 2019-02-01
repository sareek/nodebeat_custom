var userRoutes = (function () {


    const userRouter = require('express').Router(),
        userModule = require('./index');

    userRouter.route('/')
        .get(userModule.getUsers)
        .post(userModule.addUser);

    userRouter.route('/:id')
            .get(userModule.getUserById)
            .put(userModule.updateUseById)
            .patch(userModule.patchUserById)


    
    return userRouter;
})();
module.exports = userRoutes;