

const config = require('./config'); 

const apiConfig = {
  headers: {
    keyid: config.apiKey,
    secret: config.apiSecret,
    'Content-Type': 'application/json',
  },
  baseUrl: process.env.BASE_URL_SANDBOX,
};

const dotenv = require('dotenv');
dotenv.config();

module.exports = apiConfig;
