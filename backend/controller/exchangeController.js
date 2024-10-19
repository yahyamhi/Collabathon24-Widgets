const fs = require('fs');
const path = require('path');
const { exchangeRateClient } = require('../utils/httpClient');

// Path to exchange rate data file
const currencyDataPath = path.resolve(__dirname, '../data/currencies.json');

// Controller to fetch supported currencies
exports.getSupportedCurrencies = (req, res) => {
  fs.readFile(currencyDataPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read currency data' });
    }
    res.json(JSON.parse(data));
  });
};

// Updated controller to fetch the latest exchange rates from the external API
exports.getLatestExchangeRates = async (req, res) => {
    const { from = 'EUR' } = req.query; // Default base currency is EUR if not provided
    try {
      const response = await exchangeRateClient.get(`/latest/${from}`);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching latest exchange rates:', error);
      res.status(500).json({ error: 'Unable to fetch exchange rates' });
    }
  };
  
// Controller to convert currency using the external API
exports.convertCurrency = async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'from, to, and amount are required' });
  }

  try {
    const response = await exchangeRateClient.get(`/pair/${from}/${to}/${amount}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error converting currency:', error);
    res.status(500).json({ error: 'Unable to convert currency' });
  }
};
