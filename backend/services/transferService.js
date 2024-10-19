// backend/services/transferService.js
const fs = require('fs');
const path = require('path');

// Path to the mock JSON data file
const dataPath = path.resolve(__dirname, '../data/accountSummary.json');

const transferService = {
  // Service to get all account balances
  getAccountBalances: async () => {
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      const accounts = JSON.parse(data).accounts;

      // Return available balances and currencies
      const accountBalances = accounts.map(account => ({
        accountId: account.accountId,
        availableBalance: account.balances.available,
        currency: account.balances.currency
      }));

      return accountBalances;
    } catch (error) {
      console.error('Error fetching account balances:', error);
      throw error;
    }
  },

  // Service to perform quick transfer
  quickTransfer: async (fromAccountId, toAccountId, amount) => {
    if (!fromAccountId || !toAccountId || !amount) {
      throw new Error('Missing transfer details');
    }

    try {
      // Read the account summary JSON data
      const data = fs.readFileSync(dataPath, 'utf8');
      const accounts = JSON.parse(data).accounts;

      // Find the sender and receiver accounts
      const fromAccount = accounts.find(account => account.accountId === fromAccountId);
      const toAccount = accounts.find(account => account.accountId === toAccountId);

      if (!fromAccount || !toAccount) {
        throw new Error('Account not found');
      }

      // Parse available balances
      const fromBalance = parseFloat(fromAccount.balances.available);
      const toBalance = parseFloat(toAccount.balances.available);

      // Check if the sender has enough balance
      if (fromBalance < amount) {
        throw new Error('Insufficient balance');
      }

      // Perform the transfer
      fromAccount.balances.available = (fromBalance - amount).toFixed(2);
      toAccount.balances.available = (toBalance + amount).toFixed(2);

      // Update the data and write it back to the JSON file
      fs.writeFileSync(dataPath, JSON.stringify({ accounts }), 'utf8');

      return {
        fromAccount: {
          accountId: fromAccount.accountId,
          newBalance: fromAccount.balances.available,
          currency: fromAccount.balances.currency
        },
        toAccount: {
          accountId: toAccount.accountId,
          newBalance: toAccount.balances.available,
          currency: toAccount.balances.currency
        }
      };
    } catch (error) {
      console.error('Error processing transfer:', error);
      throw error;
    }
  }
};

module.exports = transferService;
