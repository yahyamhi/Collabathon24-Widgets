// backend/services/cashFlowService.js
const fs = require('fs');
const path = require('path');

// Path to cash flow data file
const cashFlowDataPath = path.resolve(__dirname, '../data/cashFlowData.json');

const cashFlowService = {
  // Fetch cash flow data from local file
  getCashFlowData: () => {
    return new Promise((resolve, reject) => {
      fs.readFile(cashFlowDataPath, 'utf-8', (err, data) => {
        if (err) {
          reject(new Error('Unable to read cash flow data'));
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  },
};

module.exports = cashFlowService;
