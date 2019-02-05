

exports.authorization=async(req,res,next)=>{
    if( req.decodedUser.userRole==='superuser'|| req.decodedUser.userRole==='superadmin'){
        next();
    }
    else{
        res.json({
            status:403,
            message:'Access denied'
        });
    }
}