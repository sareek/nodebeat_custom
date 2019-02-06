(() => {
    'use strict';

    const config = require('../config');

    exports.getUsers = async (req, res, next) => {
        try {
            // res.send("you called get users method");
            // console.log('you called get users method');
            const user = await db.collection('User').find({ deleted: false }, {
                projection: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    userRole: 1,
                    salutation: 1,
                    deleted: 1,
                    isVerified: 1,
                    agree_terms_condition: 1
                }
            }).toArray();
            console.log('user results are', user);
            if (user.length > 0) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ message: 'could not find results' });
            }


        } catch (err) {
            next(err);
        }
    }


})();