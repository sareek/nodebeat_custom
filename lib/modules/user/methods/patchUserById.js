(()=>{
    'use strict';

    const config=require('../config');

    exports.patchUserById=async(req,res,next)=>{
        try{
            res.send("you called patch users method");
            console.log('you called patch users method');
        }catch(err){
            console.log(err);
        }
    }
})();