// backend/utils/httpClient.js
const axios = require('axios');
const config = require('../config/config');

const httpClient = axios.create({
  baseURL: config.baseUrl,
  headers: {
    keyid: config.apiKey,
    secret: config.apiSecret,
    'Content-Type': 'application/json',
  },
});

module.exports = httpClient;
