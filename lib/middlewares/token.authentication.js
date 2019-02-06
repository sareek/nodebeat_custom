

const { verifyToken } = require('../helpers/jwt.helper');

exports.checkToken = async (req, res, next) => {

    const token = req.header('auth-token');

    if (!token) return res.status(401).json({
        message: 'Access denied.Token is not provided'
    });

    // const tokenResult = await findToken(token);
    // console.log('data will be shown if token matches', tokenResult);

    // if (!tokenResult) return res.json({
    //     status: 401,
    //     message: 'Access denied no token provided'
    // });

    try {
        const tokenVerified = await verifyToken(token);
        req.decodedUser = tokenVerified;

        next();
    } catch (ex) {
        return res.status(400).json({
            message: 'Invalid token provided'
        });
    }





}

// var findToken = async (token) => {
//     return db.collection('User').findOne({ jwtToken: token });
// }