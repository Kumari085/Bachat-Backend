const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('auth API is working');
})          

module.exports=router;