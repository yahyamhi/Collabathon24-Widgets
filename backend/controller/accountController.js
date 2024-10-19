const path = require('path');
const fs = require('fs');

// Path to the mock JSON data file
const dataPath = path.resolve(__dirname, '../data/accountSummary.json');

// Controller to fetch account summary based on accountId
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

// Controller to fetch the list of account IDs
exports.getAccountIds = (req, res, next) => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const accounts = JSON.parse(data).accounts;

    // Extract only the account IDs
    const accountIds = accounts.map(account => account.accountId);
    
    res.json(accountIds);
  } catch (error) {
    console.error('Error fetching account IDs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
