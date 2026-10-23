const goalModel = require('../models/Goal');
const goalStatus = require('../utils/goalStatus')
const {calculateSavingPercentage} = require('../utils/financialCalculations')

module.exports.getGoals = async (req, res) => {
    try {

        const goals = await goalModel.find().lean();

        for (const goal of goals) {
            goal.status = goalStatus(goal);
        }
          
        for(const g of goals){
            g.percentage =calculateSavingPercentage(g.targetAmount,g.currentAmount);
        }



        res.status(200).json({ goals });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports.getGoal = async (req, res) => {
    try {
        const goal = await goalModel.findById(req.params.id);


        if (!goal) {
            return res.status(404).json({
                message: "Goal not found"
            });
        }


        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports.createGoal = async (req, res) => {
    try {
        const goal = await goalModel.create(req.body);
        res.status(201).json(goal);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports.updateGoal = async (req, res) => {
    try {
        const goal = await goalModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!goal) {
            return res.status(404).json({
                message: "Goal not found"
            });
        }
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports.deleteGoal = async (req, res) => {
    try {
        const goal = await goalModel.findByIdAndDelete(req.params.id);
        if (!goal) {
            return res.status(404).json({
                message: "Goal not found"
            });
        }
        res.status(200).json({ message: "Goal deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

module.exports.addMoneyToGoal = async (req, res) => {
    try {




        const goal = await goalModel.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found"
            });
        }

        if (typeof req.body.amount !== "number") {
            return res.status(400).json({
                message: "Amount must be a number"
            });
        }

        if (req.body.amount <= 0) {
            return res.status(400).json({ message: "Invalid amount to add" })
        }
        goal.currentAmount += req.body.amount;
        await goal.save();
        res.status(200).json(goal);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}