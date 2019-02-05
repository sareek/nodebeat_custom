
'use strict';
const fs = require('fs');
const path = require('path');
process.env.NODE_CONFIG_DIR = __dirname + '../config/';
const config = require('config');



module.exports = () => {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
    }
}

