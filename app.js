var express = require('express'),
    app = express(),
    parser = require('body-parser');

app.use(parser.json());
app.use(express.static('./public'));

var router = require('./lib/routes'),
    dbConnector = require('./lib/helpers/database.helper');

    
dbConnector.init(app);
router.init(app);



module.exports = app;