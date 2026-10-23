const express = require('express');
const router = express.Router();

const {getGoals,getGoal,createGoal,updateGoal,deleteGoal,addMoneyToGoal}=require("../controllers/goal.controller")

//get all goals
router.get('/',getGoals);

//get one gaol by id
router.get('/:id',getGoal)

//create a new goal
router.post('/',createGoal)

//update a goal by id 
router.put('/:id',updateGoal)

//delete a goal by id
router.delete('/:id',deleteGoal)


//add money to particular gaol
router.post('/:id/add-money',addMoneyToGoal)

module.exports=router
















module.exports = router;


