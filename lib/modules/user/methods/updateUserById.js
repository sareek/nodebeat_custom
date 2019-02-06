(()=>{
    'use strict';

    const config=require('../config');

    exports.updateUseById=async(req,res,next)=>{
        try{
            res.send("you called update users method");
            console.log('you called update users method');
        }catch(err){
            console.log(err);
        }
    }
})();