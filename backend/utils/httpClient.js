const axios = require('axios');
const config = require('../config/config');

// Function to create a custom HTTP client for different APIs
const createHttpClient = (baseUrl, headers = {}) => {
  return axios.create({
    baseURL: baseUrl,
    headers: headers,
  });
};

// Default client for Commerzbank's API
const commerzbankClient = createHttpClient(config.baseUrl, {
  keyid: config.apiKey,
  secret: config.apiSecret,
  'Content-Type': 'application/json',
});

// Client for Exchange Rate API
const exchangeRateClient = createHttpClient(`${config.baseUrlExchangeRate}${config.apiKeyExchangeRate}`, {
  'Content-Type': 'application/json',
});

module.exports = {
  commerzbankClient,
  exchangeRateClient,
};
// Add a response interceptor
httpClient.interceptors.response.use(
  response => response,
  error => {
    console.error('HTTP Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

module.exports = httpClient;
