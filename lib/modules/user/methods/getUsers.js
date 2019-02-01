(()=>{
    'use strict';

    const config=require('../config');

    module.exports=async(req,res,next)=>{
        try{
            res.send("you called get users method");
            console.log('you called get users method');
        }catch(err){
            console.log(err);
        }
    }
})();