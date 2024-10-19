const fs = require('fs');
const path = require('path');

// Path to the mock JSON data file
const dataPath = path.resolve(__dirname, '../data/taxComplianceData.json');

// Controller to fetch tax compliance data
exports.getTaxComplianceData = (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read tax compliance data' });
    }
    res.json(JSON.parse(data));
  });
};
