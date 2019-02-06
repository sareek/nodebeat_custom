(()=>{
    'use strict';

    const config=require('../config');
exports.deleteUserById=async(req,res,next)=>{
        try{
            res.send("you called delete users method");
            console.log('you called delete users method');
        }catch(err){
            console.log(err);
        }
    }
})();