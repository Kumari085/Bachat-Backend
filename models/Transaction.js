const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
    type: Number,
    required: true,
    min: 0
},
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },
    necessity: {
        type: String,
        enum: ['necessary', 'optional', 'avoidable'],
       
    },
    description: String,
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model('Transaction', transactionSchema);