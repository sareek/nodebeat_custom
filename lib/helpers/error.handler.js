module.exports = errorHandler;
const logwriter = require('./logwriter.helper');

function errorHandler(err, req, res, next) {

    logwriter.writeError(err);

    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'Unauthorized') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: 'Internal server error' });
}