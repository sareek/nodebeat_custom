((redisConnector)=>{

    const redis=require('redis');

    const redisClient=redis.createClient();

    const redisConfig=require('../configs/redis.config');

    redisConnector.init=async(app)=>{
        const redisClient=redis.createClient({
                host:redisConfig.host,
                port:redisConfig.port
        });

        await redisClient.on('ready',function(){
                console.log('Redis server is ready');
        });

        await redisClient.on('error',function(){
            console.log('Error on Redis server connection');
        });

    }

    redisConnector.saveToRedis=(key,data)=>{
        redisClient.set(key,JSON.stringify(data));
    }

    redisConnector.getRedisData=(key)=>{
        return new Promise((resolve,reject)=>{
            try{
                redisClient.get(key,(err,data)=>{
                    if(err) reject(err);

                    if(data) resolve(data);
                    resolve(null);
                });
            }catch(err){
                reject(null);
            }
        });
    }

    redisConnector.expireKey=(key,num)=>{
        return redisClient.expire(key,num);
    }

    redisConnector.checkKeyExistOrNot=(key)=>{
        return new Promise((resolve,reject)=>{
            redisClient.exists(key,(err,data)=>{
                if(err) reject(err);
                resolve(data);
            });
        });
    }

    redisConnector.deleteKey=(id)=>{
        return redisClient.del(id,(err,reply)=>{
            console.log("reply ==>",reply);
        });
    }
})(module.exports);