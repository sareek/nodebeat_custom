((logWriter) => {
    'use strict';

    const { createLogger, transports, format } = require('winston');
    const { combine, label, printf } = format;
    const morgan = require('morgan');
    const fs = require('fs');
    const path = require('path');
    const moment = require('moment-timezone'),
        dbConfig = require('../config/app.config');

    const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`);
    const appendTimestamp = format((info, opts) => {
        if (opts.tz)
            info.timestamp = moment().tz(opts.tz).format();
        return info;
    });


    const accessLogStream = fs.createWriteStream(
        path.join(__dirname, 'logs', 'Loggerfile.log'),
        { flags: 'a' }
    );


    logWriter.init = (app) => {


        require('winston-mongodb');
        require('express-async-errors');

        morgan.token('date', (req, res, tz) => {
            return moment().tz('Asia/Kathmandu').format();
        });
        morgan.format('myformat', '[:date[Asia/kathmandu]] ":method :url" :status :res[content-length] - :response-time ms');
        app.use(morgan('myformat', { stream: accessLogStream }));

        process.on('unhandledRejection', (ex) => {
            // throw ex;
            // next(ex);
            console.log('error logger unhandled error rejection', ex);
        });




    }

    logWriter.writeError = (err) => {

       


        const logger = createLogger({
            level: 'info',
            format: combine(
                //winston.format.colorize(),
                label({ label: 'Messages' }),
                appendTimestamp({ tz: 'Asia/Kathmandu' }),
                myFormat
            ),
            transports: [
                new transports.File({ filename: path.join(__dirname, 'logs', 'error.log'), level: 'error' }),
                new transports.MongoDB({ db: dbConfig.mlabUrl })
            ],
            exceptionHandlers: [
                new transports.Console({ colorize: true, prettyPrint: true }),
                new transports.File({ filename: path.join(__dirname, 'logs', 'uncaughtExceptions.log') })
            ],
            exitOnError: false
        });

        logger.error(err.message, err);
    }

})(module.exports);