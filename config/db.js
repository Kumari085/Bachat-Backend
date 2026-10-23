const mongoose=require('mongoose');


const ConnectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected");
    }catch(error){
        console.log("mongoDB connection failed :",error.message);
    }
}

module.exports=ConnectDB;