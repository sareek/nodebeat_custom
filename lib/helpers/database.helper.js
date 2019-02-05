((dbConnector) => {
    'use strict';
    const MongodbClient = require('mongodb').MongoClient,
        dbConfig = require('../config/app.config');

    dbConnector.init = async (app) => {
        MongodbClient.connect(dbConfig.mlabUrl, { useNewUrlParser: true })
            .then(async (client) => {
                const db = client.db(`${dbConfig.mlabDB}`);
                global.db = db;

                const collection = db.collection("User");
                const superuser = await collection.findOne({ user_role: "superuser" });

                if (!superuser) {
                    console.log('we are going to create a super user');

                }
            })
            .catch((err) => {
                console.log('Database connection denied', err.stack);
            });
    }

})(module.exports);