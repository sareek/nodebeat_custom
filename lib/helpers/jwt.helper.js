const jwt=require('jsonwebtoken'),
config=require('../config/app.config');


exports.generateToken= (user)=>{
    let token = jwt.sign({user:user},config.privateKey,{
        expiresIn:'10 days',
        issuer:user._id.toString()
    });
    return token;
}

exports.verifyToken=async(token)=>{
    return jwt.verify(token, config.privateKey);
}