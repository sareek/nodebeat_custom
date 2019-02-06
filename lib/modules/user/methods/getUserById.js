(() => {
    'use strict';

    const config = require('../config'),
        mongoClient = require('mongodb').mongoClient,
        ObjectId = require('mongodb').ObjectID;

    module.exports.getUserById = async (req, res, next) => {
        try {
            const user = await db.collection('User').findOne({ _id: req.params.id });
            // console.log('user results are', user);
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ message: 'could not find results' });
            }


        } catch (err) {
            next(err);
        }
    }
})();