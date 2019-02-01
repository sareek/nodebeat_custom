(()=>{
    'use strict';

    const config=require('../config');

    module.exports=async(req,res,next)=>{
        try{
            res.send("you called delete users method");
            console.log('you called delete users method');
        }catch(err){
            console.log(err);
        }
    }
})();