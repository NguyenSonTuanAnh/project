const mongoose = require("mongoose");
module.exports.connect = async ()=>{
    try{
        await mongoose.connect(process.env.MongoURL);
        console.log("Connect success");
    }catch(error){
        console.error(error);
    }
};
