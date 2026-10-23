const transactionModel = require('../models/Transaction');



module.exports.getTransactions = async (req, res) => {
    try {
        const { month, year, type, category } = req.query;
        const filter = {}



        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1);

            filter.date = {
                $gte: startDate,
                $lt: endDate
            };
        }

        if (type) {
            filter.type = type;
        }

        if (category) {
            filter.category = category;
        }




        const transactions = await transactionModel.find(filter);
        res.status(200).json(transactions);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });

    }
}

module.exports.getTransaction = async (req, res) => {
    try {
        const transaction = await transactionModel.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found " })
        }



        res.status(200).json(transaction);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });

    }

}

module.exports.createTransaction = async (req, res) => {
    try {
        const transaction = await transactionModel.create(req.body);
        res.status(201).json(transaction)
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
}

module.exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await transactionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }



        res.status(200).json(transaction);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });

    }

}

module.exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await transactionModel.findByIdAndDelete(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }


        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });

    }

}

