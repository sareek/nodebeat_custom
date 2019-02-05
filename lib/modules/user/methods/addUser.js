var adduserController = (() => {
    'use strict';

    const { messageConfig } = require('../config'),
        { generateSalt, hashPassword } = require('./../../../helpers/bcrypt.helper'),
        { errorMessageContol, paginationControl } = require('../../../helpers/utilities.helper'),
        BCRYPT_SALT_ROUNDS = 10,
        datacollectorHelper = require('../../../helpers/datacollector.helper');




    let validationCheck = async (req) => {
        req.checkBody("firstName", messageConfig.validationErrMessage.first_name).notEmpty();
        req.checkBody("firstName", messageConfig.validationErrMessage.first_name_alpha).isAlpha();
        req.checkBody("lastName", messageConfig.validationErrMessage.last_name).notEmpty();
        req.checkBody("lastName", messageConfig.validationErrMessage.last_name_alpha).isAlpha();
        req.checkBody("email", messageConfig.validationErrMessage.email).notEmpty();
        req.checkBody("email", messageConfig.emailErr.validationErr.email).isEmail();
        req.checkBody("salutation", messageConfig.validationErrMessage.salutation).notEmpty();
        req.checkBody("salutation", messageConfig.validationErrMessage.salutationField).optional().isIn(["Mr.", "Mrs.", "Miss"]);
        req.checkBody("userRole", messageConfig.validationErrMessage.user_role).notEmpty();
        req.checkBody("userRole", messageConfig.validationErrMessage.user_role_field).optional().isIn(['superuser', 'user']);
        req.checkBody("password", messageConfig.validationErrMessage.password).notEmpty();
        req.checkBody("agree_terms_conditions", messageConfig.validationErrMessage.agree_terms_condition).notEmpty().isBoolean();

        const result = await req.getValidationResult();
        return result.array();
    };


    var createUser = async (req, res, next) => {
        try {

            // console.log('agree => ', req.body.agree_terms_condition)
            // let validation = await validationCheck(req);


            // if (validation.length > 0) return res.status(400).json({
            //     status_code: "400",
            //     status: "Bad request",
            //     err: errMsg.errorMessageControl(validation)
            // })


            const userData = datacollectorHelper.userDataCollector(req.body);
            console.log("data arrived in add user method", userData);


            const emailExists = await checkEmailExists(userData);
            console.log("email exists??", emailExists);


            if (emailExists) return res.json({
                status: "409",
                status: "Conflict",
                message: messageConfig.emailErr.conflictMessage
            });

            if (userData.agree_terms_condition === 'false' || userData.agree_terms_condition === false) {
                console.log('HEREIAM');
                return res.json({
                    message: messageConfig.validationErrMessage.agree_terms_condition
                });
            }
            const responseData = await saveUser(userData);
            res.json({
                message: messageConfig.user.userCreateSuccess.message,
                data: responseData
            });

        } catch (err) {
            res.json({
                status_code: "400",
                status: "Bad Request",
                err: err.toString()
            });
        }
    }

    var saveUser = async (body) => {
        console.log("we are in save log");
        const salt = await generateSalt(BCRYPT_SALT_ROUNDS);
        console.log("salt=>", salt);
        console.log("password=>", body.password);
        const hshPsw = await hashPassword(body.password, salt)
        console.log("hashpassword=>", hshPsw);

        return db.collection("User").insertOne({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hshPsw,
            salutation: body.salutation,
            userRole: body.userRole,
            agree_terms_condition: body.agree_terms_condition,
            deleted: false,
            isVerified: false,
            subscribe: false,
        });
    }

    var checkEmailExists = function (data) {
        return db.collection("User").findOne({ email: data.email });
    }


    return {
        createUser,
        saveUser,
        checkEmailExists
    }
})();
module.exports = adduserController;