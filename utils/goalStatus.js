const getGoalStatus = (goal) => {
    if (goal.currentAmount >= goal.targetAmount) {
        return "achieved";
    }

    if (new Date() > goal.deadline) {
        return "expired";
    }

    return "pending";
};

module.exports = getGoalStatus;