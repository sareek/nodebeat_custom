
const _ = require('lodash');

exports.userDataCollector = (data) => {
    console.log('mock flow  test');
    var user = _.pick(data, ['firstName', 'lastName', 'email', 'salutation', 'userRole', 'agree_terms_condition', 'password'])


    return user;
}

exports.loginDataCollector = (data) => {
    var user = _.pick(data, ['email', 'password']);
    return user;
}