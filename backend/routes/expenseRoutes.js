const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');

// Route for getting expenses
router.get('/expenses', expenseController.getExpenses);

module.exports = router;
