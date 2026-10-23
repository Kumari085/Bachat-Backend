const transactionModel = require('../models/Transaction');
const goalModel = require('../models/Goal');
const goalStatus = require('../utils/goalStatus')
const {
    totalIncome,
    totalExpenses,
    calculateSavings,
    calculateExpenseByCategory
} = require('../utils/financialCalculations');

module.exports.getDashboard = async (req,res)=>{
    try{

        const goals = await goalModel.find().lean();

        for(const goal of goals){
            goal.progressPercentage = (goal.currentAmount / goal.targetAmount) * 100;
            goal.status = goalStatus(goal);
        }
    
        const month = Number(req.query.month||(new Date().getMonth()+1));
        const year = Number(req.query.year||new Date().getFullYear() );

        const startDate = new Date(year, month-1,1);
        const endDate = new Date(year,month,1);

        const transactions = await transactionModel.find({
            date:{
            $gte:startDate,
            $lt:endDate
        }
        })



                const incomeTotal = totalIncome(transactions);
                const expenseTotal = totalExpenses(transactions);
                const savingsTotal = calculateSavings(incomeTotal, expenseTotal);
                const expenseByCategory = calculateExpenseByCategory(transactions);
        
          res.status(200).json({
                        month,
                        year,
                        totalIncome: incomeTotal,
                        totalExpense: expenseTotal,
                        totalSavings: savingsTotal,
                        expenseByCategory,
                        goals
          });

    }catch(error){
        res.status(500).json({error:error.message});
    }
}