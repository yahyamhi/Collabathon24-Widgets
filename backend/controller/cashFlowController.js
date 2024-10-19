<<<<<<< HEAD
const path = require('path');
const fs = require('fs');

// Path to the mock JSON data file
const dataPath = path.resolve(__dirname, '../data/cashFlowData.json');

exports.getCashFlowData = async (req, res) => {
  try {
    // Read the JSON file
    const data = fs.readFileSync(dataPath, 'utf8');
    const cashFlowData = JSON.parse(data).cashFlows;

    // Get the timeRange parameter from the request
    const { timeRange } = req.query;

    // Filter data based on timeRange
    const today = new Date();
    let days;

    switch (timeRange) {
      case '24hours':
        days = 1;
        break;
      case '7days':
        days = 7;
        break;
      case '15days':
        days = 15;
        break;
      case '30days':
        days = 30;
        break;
      default:
        days = 7; // Default to 7 days if no valid timeRange is provided
    }

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days + 1);

    // Filter cash flow data to only include records from the past 'n' days
    const filteredData = cashFlowData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= today;
    });

    // Respond with the filtered data
    res.json(filteredData);
  } catch (error) {
    console.error('Error reading cash flow data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
=======
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
>>>>>>> 90e3b9f0c217a2a471d500318ecabec684490cc8
