const mongoose=require('mongoose');

const goalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    targetAmount:{
        type:Number,
        required:true,
        min: 0.01

    },
    currentAmount:{
        type:Number,
        required:true,
        default:0,
        min: 0
    },

    description: {
    type: String
},

    startDate:{
        type:Date,
        required:true,
        default:Date.now
        },
    deadline:{
        type:Date,
       required:true
    }    
})

module.exports=mongoose.model('Goal',goalSchema);

