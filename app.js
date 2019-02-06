var express = require('express'),
    app = express(),
    parser = require('body-parser'),
    cors = require('cors'),
    passport=require('passport');

app.use(parser.json());
app.use(express.static('./public'));

app.use(cors());




var router = require('./lib/routes'),
    dbConnector = require('./lib/helpers/database.helper'),
    redisConnector = require('./lib/helpers/redis.helper'),
    logWriter = require('./lib/helpers/logwriter.helper'),
    { logger } = require('./lib/helpers/logwriter.helper'),
    messageConfig = require('./lib/config/api.message.config'),
    errorHandler=require('./lib/helpers/error.handler');

dbConnector.init(app);
redisConnector.init(app);
app.use(passport.initialize());
app.use(passport.session());
require('./lib/auth/passport')(passport);
router.init(app);
logWriter.init(app);

// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         logWriter.writeError(err);
//         res.status(500).json({
//             message: messageConfig.errorMessage.internalServerError
//         })
//     });
// }

// throw new Error('un caught error');

// if (app.get('env') === 'production') {
//     app.use(function (err, req, res, next) {
//         logWriter.writeError(err);

//         res.status(500).json({
//             message: messageConfig.errorMessage.internalServerError
//         });
//     });
// }
app.use(errorHandler);

module.exports = app;