var userController = (function () {

    const express=require('express'),
        ObjectID=require('mongodb').ObjectID,
        config=require('./config'),
        adduserController=require('./methods/addUser');
    
    const getUsers=require('./methods/getUsers');
    const addUser=adduserController.createUser;
    const getUserById=require('./methods/getUserById');
    const updateUseById=require('./methods/updateUserById');
    const deleteUser=require('./methods/deleteUserById');
    const patchUserById=require('./methods/patchUserById');
   
    return {
        getUsers,
        addUser,
        getUserById,
        updateUseById,
        deleteUser,
        patchUserById
    }
})();
module.exports = userController;