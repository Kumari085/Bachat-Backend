const transactionModel = require('../models/Transaction');
const {
    totalIncome,
    average,
    totalExpenses,
    calculateSavings,
    calculateSavingPercentage,
    calculateExpenseByCategory,
    calculateExpenseByNecessity,
    highestAmongCategories,
    highestAmongNecessity,
    totalTransaction,
    calculateTotalAmount,
    expensesPercentageByNecessity,
    calculateMonthlyTrend
    
    
} = require('../utils/financialCalculations');


module.exports.getReports = async (req,res)=>{
    try{
           const startMonth = Number(req.query.startMonth||1);
    const endMonth = Number(req.query.endMonth||12);
    const startYear = Number(req.query.startYear|| (new Date().getFullYear()));
    const endYear = Number(req.query.endYear||(new Date().getFullYear()));
    const startDate = new Date(startYear,startMonth-1,1);
    const endDate = new Date(endYear,endMonth,1);

     const totalMOnths = ( endDate.getMonth()-startDate.getMonth() )+(endDate.getFullYear() - startDate.getFullYear())*12;



    const transactions = await transactionModel.find({date:{
        $gte:startDate,
        $lt:endDate
    }})
    const incomeTotal = totalIncome(transactions);
    const incomeAverage=average(incomeTotal,totalMOnths);
    const expenseTotal = totalExpenses(transactions);
    const expenseAverage = average(expenseTotal,totalMOnths);
    const savingTotal = calculateSavings(incomeTotal,expenseTotal);
    const savingAverage = average(savingTotal,totalMOnths);
    const totalTransactions = totalTransaction(transactions);



    const reports = [];
    const monthsReports = {};
    let previousMonthIncomeAmount =0;
    let currentMonthIncomeAmount =0;
    let previousMonthExpenseAmount =0;
    let currentMonthExpenseAmount =0;
    let previousMonthSaving =0;
    let currentMonthSaving=0;



for(const transaction of transactions){
    const month = transaction.date.getMonth()+1;
    const year = transaction.date.getFullYear();

    const key = `${month}-${year}`;

     if(!monthsReports[key]){
        monthsReports[key]=[];
     }

     monthsReports[key].push(transaction);
}



for(const key in monthsReports){
    const monthTransactions = monthsReports[key];

    

     const income = totalIncome(monthTransactions);
      currentMonthIncomeAmount = income;
      const MonthlyIncomeTrend = calculateMonthlyTrend(currentMonthIncomeAmount,previousMonthIncomeAmount);
      previousMonthIncomeAmount = currentMonthIncomeAmount;

    const expense = totalExpenses(monthTransactions);
     currentMonthExpenseAmount = expense;
     const MonthlyExpenseTrend = calculateMonthlyTrend(currentMonthExpenseAmount,previousMonthExpenseAmount);
     previousMonthExpenseAmount=currentMonthExpenseAmount;

    const savings = calculateSavings(income, expense);
    currentMonthSaving=savings;
    const MonthlySavingTrend = calculateMonthlyTrend(currentMonthSaving,previousMonthSaving);
    previousMonthSaving=currentMonthSaving;

     const savingPercentage = calculateSavingPercentage(income, expense);
    const expenseByCategory = calculateExpenseByCategory(monthTransactions);
     const expenseByNecessity = calculateExpenseByNecessity(monthTransactions);
     const highestCategoryValue = highestAmongCategories(expenseByCategory);
     const highestNecessityValue = highestAmongNecessity(expenseByNecessity)
     const totalTransactionsInMonth =totalTransaction(monthTransactions);
     const totalExpenseByNecessity = calculateTotalAmount(expenseByNecessity);
     const {avoidablePercentage,necessaryPercentage,optionalPercentage}=expensesPercentageByNecessity(expenseByNecessity,totalExpenseByNecessity);


    reports.push({
       month:key, 
       income,
       expense,
       savings,
       savingPercentage,
       expenseByCategory,
       expenseByNecessity,
       highestCategoryValue,
       highestNecessityValue,
       totalTransactionsInMonth,
       avoidablePercentage,
       necessaryPercentage,
       optionalPercentage,
       MonthlyIncomeTrend,
       MonthlyExpenseTrend,
       MonthlySavingTrend


       
    });
}




res.status(200).json({MonthsReport:reports,incomeAverage,expenseAverage,savingAverage,totalTransactions,incomeTotal,expenseTotal,savingTotal});

    }catch(error){
        res.status(500).json({error:error.message});
    }
}



