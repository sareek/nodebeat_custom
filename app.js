var express = require('express'),
    app = express(),
    parser = require('body-parser'),
    cors = require('cors');

app.use(parser.json());
app.use(express.static('./public'));

app.use(cors());




var router = require('./lib/routes'),
    dbConnector = require('./lib/helpers/database.helper'),
    redisConnector = require('./lib/helpers/redis.helper'),
    logWriter = require('./lib/helpers/logwriter.helper');

// require('./lib/helpers/errorlog.helper')(); 
// require('./lib/helpers/privatekey.helper')();
dbConnector.init(app);
redisConnector.init(app);
router.init(app);
logWriter.init(app);



module.exports = app;