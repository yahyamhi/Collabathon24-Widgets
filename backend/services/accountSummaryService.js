const path = require('path');
const fs = require('fs');

// Path to the mock JSON data file
const dataPath = path.resolve(__dirname, '../data/accountSummary.json');

const accountSummaryService = {
  getAccountSummary: async (accountId) => {
    try {
      // Read the JSON file
      const data = fs.readFileSync(dataPath, 'utf8');
      const accounts = JSON.parse(data).accounts;

      // Find the account with the matching accountId
      const accountSummary = accounts.find(account => account.accountId === accountId);

      if (accountSummary) {
        return accountSummary;
      } else {
        throw new Error('Account not found');
      }
    } catch (error) {
      console.error('Error fetching account summary from mock data:', error);
      throw error;
    }
  },
};

module.exports = accountSummaryService;
