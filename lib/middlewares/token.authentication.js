

const { verifyToken } = require('../helpers/jwt.helper');
let collection = db.collection('User');

exports.checkToken = async (req, res, next) => {

    const token = req.headers['auth-token'];

    const tokenResult = await findToken(token);
    console.log('data will be shown if token matches', tokenResult);

    if (!tokenResult) return res.json({
        status: 401,
        message: 'Access denied no token provided'
    });

    const tokenVerified = verifyToken(token);

    if (!tokenVerified) return res.json({
        status: 400,
        message: 'Invalid token provided'
    });

    req.decodedUser = tokenVerified;

    next();





}

var findToken = (token) => {
    return collection.findOne({ jwtToken: token });
}