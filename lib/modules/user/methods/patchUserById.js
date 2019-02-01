(()=>{
    'use strict';

    const config=require('../config');

    module.exports=async(req,res,next)=>{
        try{
            res.send("you called patch users method");
            console.log('you called patch users method');
        }catch(err){
            console.log(err);
        }
    }
})();