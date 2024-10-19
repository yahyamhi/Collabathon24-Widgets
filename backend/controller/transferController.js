// backend/controller/transferController.js
const transferService = require('../services/transferService');

// Controller to get all account balances
exports.getAccountBalances = async (req, res) => {
  try {
    const accountBalances = await transferService.getAccountBalances();
    res.json(accountBalances);
  } catch (error) {
    console.error('Error fetching account balances:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for quick transfer
exports.quickTransfer = async (req, res) => {
  const { fromAccountId, toAccountId, amount } = req.body;

  try {
    const result = await transferService.quickTransfer(fromAccountId, toAccountId, amount);
    res.json({
      message: 'Transfer successful',
      fromAccount: result.fromAccount,
      toAccount: result.toAccount
    });
  } catch (error) {
    console.error('Error processing transfer:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};
