const fs = require('fs');
const path = require('path');

// Load expenses data from the file
const loadExpenses = () => {
  const dataPath = path.join(__dirname, '..', 'data', 'expenses.json');
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData).expenses;
};

// Helper function to filter data by time range
const filterExpensesByTimeRange = (expenses, timeRange) => {
  const now = new Date();
  let pastDate;

  switch (timeRange) {
    case '7days':
      pastDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case '15days':
      pastDate = new Date(now.setDate(now.getDate() - 15));
      break;
    case '30days':
      pastDate = new Date(now.setDate(now.getDate() - 30));
      break;
    case 'all':
    default:
      return expenses; // Return all data
  }

  return expenses.filter(expense => new Date(expense.date) >= pastDate);
};

// Get all expenses
exports.getExpenses = (req, res) => {
  try {
    const timeRange = req.query.timeRange || '7days';
    const expenses = loadExpenses();
    const filteredExpenses = filterExpensesByTimeRange(expenses, timeRange);
    res.json(filteredExpenses);
  } catch (err) {
    res.status(500).json({ message: 'Error loading expense data.' });
  }
};
