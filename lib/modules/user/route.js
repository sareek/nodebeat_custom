var userRoutes = (function () {


    const userRouter = require('express').Router(),
        ObjectID = require('mongodb').ObjectID;
  
    const { getUsers } = require('./methods/getUsers');
    const { createUser } = require('./methods/addUser');
    const { getUserById } = require('./methods/getUserById');
    const { updateUseById } = require('./methods/updateUserById');
    const {deleteUserById} = require('./methods/deleteUserById');
    const { patchUserById } = require('./methods/patchUserById');


    const { checkToken } = require('../../middlewares/token.authentication'),
        { authorization } = require('../../middlewares/admin.authorization');

    userRouter.route('/')
        .get(checkToken,getUsers)
        .post(createUser);

    userRouter.route('/:id')
        .get(getUserById)
        .put(updateUseById)
        .patch(patchUserById)
        .delete(deleteUserById);



    return userRouter;
})();
module.exports = userRoutes;