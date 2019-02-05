const { loginDataCollector } = require('../../../helpers/datacollector.helper');
const { comparePassword } = require('../../../helpers/bcrypt.helper');
const { messageConfig } = require('../config');
const { generateToken } = require('../../../helpers/jwt.helper');
const redisConnector = require('../../../helpers/redis.helper');
const mongoCLient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


mongoCLient.Promise = Promise;


module.exports = async (req, res, next) => {

    // throw new Error('custom error');
    let loginData = loginDataCollector(req.body);

    let user = await checkEmailExists(loginData);
    console.log("data are shown if email exists");


    if (!user) return res.status(404).send({
        status: 404,
        message: messageConfig.loginErr.emailNotMatch.message
    });

    if(user.password===null) return res.status(400).json({
        status:400,
        message:'password doesnot exists'
    });

    let validatePassword = await comparePassword(loginData.password, user.password);
    console.log('password validated', validatePassword);

    if (!validatePassword) return res.status(400).json({
        status: 400,
        message: messageConfig.loginErr.passwordNotMatch.message
    });

    let token = generateToken(user);
    console.log('token=>');


    updateUser(user, token);


    // redisConnector.saveToRedis(token, user);

    // checking
    // let value = await redisConnector.getRedisData(token);
    console.log('redis value stored=>');

    res.status(200).json({
        status: 200,
        token: token,
        message: messageConfig.loginSuccess.message
    });

}

var updateUser = (data, token) => {
    console.log('user collection is updated successfully');
    db.collection("User").updateOne({ _id: ObjectID(data._id) }, { $set: { jwtToken: token.toString() } });
}


var checkEmailExists = async (data) => {
    return db.collection("User").findOne({ email: data.email });
}