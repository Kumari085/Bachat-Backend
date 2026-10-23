


module.exports.totalIncome = (transactions) =>{
    let totalIncome = 0;
    
    for(let transaction of transactions){
        if(transaction.type === 'income'){
            totalIncome += transaction.amount;
        }
    }

    return totalIncome;
}

module.exports.totalExpenses = (transactions)=>{
    let totalExpense =0;

    for(let transaction of transactions){
        if(transaction.type === 'expense'){
            totalExpense+=transaction.amount;
        }
    }

    return totalExpense;
}

module.exports.calculateSavings=(income,expenses)=>{
    return income-expenses;
}

module.exports.calculateSavingPercentage = (income,expenses)=>{
    if(income===0){
        return 0;
    }
    let percentage = ((income-expenses)/income)*100;

    return percentage;
}

module.exports.calculateExpenseByCategory=(transactions)=>{
  let expenseByCategory={};

  for(let transaction of transactions){
    if(transaction.type==='expense'){
        if(!expenseByCategory[transaction.category]){
            expenseByCategory[transaction.category]=transaction.amount;
        }else{
            expenseByCategory[transaction.category]+=transaction.amount;
        }
    }
  }

  return expenseByCategory;
}

module.exports.calculateExpenseByNecessity=(transactions)=>{
  let expenseByNecessity={};

  for(let transaction of transactions){
    if(transaction.type==='expense'){
        if(!expenseByNecessity[transaction.necessity]){
            expenseByNecessity[transaction.necessity]=transaction.amount;
        }else{
            expenseByNecessity[transaction.necessity]+=transaction.amount;
        }
    }
  }

  return expenseByNecessity;
}

module.exports.average=(total,totalmonths)=>{
    let averageIncome = 0;
    if(totalmonths==0){
        return 0;
    }

    averageIncome = total/totalmonths;

    return averageIncome;
}

module.exports.highestAmongCategories=(expenseByCategory)=>{
    let highkey="";
    let highvalue=0;

    for(const key in expenseByCategory){
        const value = expenseByCategory[key];

        if(value>highvalue){
            highvalue = value;
            highkey = key;
        }
    }

    return {[highkey]:highvalue};
}

module.exports.highestAmongNecessity=(expenseByNecessity)=>{
    let highkey="";
    let highvalue=0;

    for(const key in expenseByNecessity){
        const value = expenseByNecessity[key];

        if(value>highvalue){
            highvalue = value;
            highkey = key;
        }
    }

    return {[highkey]:highvalue};
}

module.exports.totalTransaction = (transactions)=>{
    let total=0;
    for(const transaction of transactions){
        total+=1;
    }

    return total;
}

module.exports.calculateTotalAmount = (expenses)=>{
    let total=0;
    for(const key in expenses){
        total+=expenses[key];

    }

    return total;
}

module.exports.expensesPercentageByNecessity =(expenseByNecessity,total)=>{
    let avoidablePercentage=0;
    let necessaryPercentage=0;
    let optionalPercentage=0;

    if(total===0){
        return 0;
    }

    for(const key in expenseByNecessity){
        if(key==='avoidable'){
            avoidablePercentage = (expenseByNecessity[key]/total)*100;
        }

        if(key==='necessary'){
            necessaryPercentage = (expenseByNecessity[key]/total)*100;
        }

        if(key==='optional'){
            optionalPercentage = (expenseByNecessity[key]/total)*100;
        }
    }

    return {avoidablePercentage,necessaryPercentage,optionalPercentage};
}

module.exports.calculateMonthlyTrend = (currentValue, previousValue) => {
    let trend = 0;
    let value = "";

    if (previousValue === 0) {
    return { value: "new", trend: 0 };
}

    if (currentValue === previousValue) {
        value = "nochange";
        return { value, trend };
    }

    if (currentValue > previousValue) {
        trend = ((currentValue - previousValue) / previousValue) * 100;
        value = "increases";
    } else {
        trend = ((previousValue - currentValue) / previousValue) * 100;
        value = "decreases";
    }

    return { value, trend };
};