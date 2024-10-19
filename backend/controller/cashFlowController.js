// backend/controller/cashFlowController.js
const path = require('path');
const fs = require('fs');

// Path to the mock JSON data file
const dataPath = path.resolve(__dirname, '../data/cashFlowData.json');

exports.getCashFlowData = async (req, res) => {
  try {
    // Read the JSON file
    const data = fs.readFileSync(dataPath, 'utf8');
    const cashFlowData = JSON.parse(data).cashFlows;
    res.json(cashFlowData);
  } catch (error) {
    console.error('Error reading cash flow data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
