((dbConnector) => {
    'use strict';
    const MongodbClient = require('mongodb').MongoClient,
        dbConfig = require('../configs/app.config');

    dbConnector.init = async (app) => {
        MongodbClient.connect(dbConfig.dburl, { useNewUrlParser: true })
            .then(async (client) => {
                const db = client.db(`${dbConfig.db}`);
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