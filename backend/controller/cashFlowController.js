// backend/controller/cashFlowController.js
const path = require('path');
const fs = require('fs');

// Path to the mock JSON data file
const dataPath = path.resolve(__dirname, '../data/cashFlowData.json');

exports.getCashFlowData = async (req, res) => {
  try {
    // Read the JSON file
    const data = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(data);

    const cashFlowData = jsonData.cashFlows;
    const projections = jsonData.projections;

    // Get the timeRange parameter from the request
    const { timeRange } = req.query;

    // Filter data based on timeRange
    const today = new Date();
    let days;

    switch (timeRange) {
      case '7days':
        days = 7;
        break;
      case '15days':
        days = 15;
        break;
      case '30days':
        days = 30;
        break;
      case 'all':
        days = null;
        break;
      default:
        days = 7; // Default to 7 days if no valid timeRange is provided
    }

    const startDate = days
      ? new Date(today.getFullYear(), today.getMonth(), today.getDate() - days + 1)
      : null;

    // Filter cash flow data to only include records from the past 'n' days
    const filteredData = cashFlowData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return !startDate || (entryDate >= startDate && entryDate <= today);
    });

    // Respond with the filtered data and projections
    res.json({
      cashFlows: filteredData,
      projections: projections,
    });
  } catch (error) {
    console.error('Error reading cash flow data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
