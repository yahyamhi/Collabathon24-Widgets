// backend/services/exchangeService.js
const { exchangeRateClient } = require('../utils/httpClient');
const fs = require('fs');
const path = require('path');

// Path to exchange rate data file
const currencyDataPath = path.resolve(__dirname, '../data/currencies.json');

const exchangeService = {
  // Fetch supported currencies from local file
  getSupportedCurrencies: () => {
    return new Promise((resolve, reject) => {
      fs.readFile(currencyDataPath, 'utf-8', (err, data) => {
        if (err) {
          reject(new Error('Unable to read currency data'));
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  },

  // Fetch latest exchange rates from external API
  getLatestExchangeRates: async (base = 'EUR') => {
    try {
      const response = await exchangeRateClient.get(`/latest/${base}`);
      return response.data;
    } catch (error) {
      throw new Error('Unable to fetch exchange rates');
    }
  },

  // Convert currency using external API
  convertCurrency: async (from, to, amount) => {
    if (!from || !to || !amount) {
      throw new Error('from, to, and amount are required');
    }

    try {
      const response = await exchangeRateClient.get(`/pair/${from}/${to}/${amount}`);
      return response.data;
    } catch (error) {
      throw new Error('Unable to convert currency');
    }
  }
};

module.exports = exchangeService;
