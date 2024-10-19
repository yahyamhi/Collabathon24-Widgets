const path = require('path');
const fs = require('fs');

// Path to the mock JSON data file
const dataPath = path.resolve(__dirname, '../data/accountSummary.json');

exports.getAccountSummary = async (req, res, next) => {
  const { accountId } = req.params;

  try {
    // Read the JSON file
    const data = fs.readFileSync(dataPath, 'utf8');
    const accounts = JSON.parse(data).accounts;

    // Find the account with the matching accountId
    const accountSummary = accounts.find(account => account.accountId === accountId);

    if (accountSummary) {
      res.json(accountSummary);
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    console.error('Error reading account summary data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
