const fs = require('fs');
const path = require('path');

// Load expenses data from the file
const loadExpenses = () => {
    const dataPath = path.join(__dirname, '..', 'data', 'expenses.json');
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData).expenses;
};

// Get all expenses
exports.getExpenses = (req, res) => {
    try {
        const expenses = loadExpenses();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: "Error loading expense data." });
    }
};
