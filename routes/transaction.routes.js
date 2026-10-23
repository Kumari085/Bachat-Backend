const express=require('express');
const router=express.Router();

const {getTransactions,getTransaction,createTransaction,updateTransaction,deleteTransaction}=require('../controllers/transaction.controller');

// get all transactions
router.get('/',getTransactions)

//get transaction by id 
router.get('/:id',getTransaction)

//create transaction
router.post('/',createTransaction)

//update transaction
router.put('/:id',updateTransaction)

//delete transaction
router.delete('/:id',deleteTransaction);






module.exports=router;