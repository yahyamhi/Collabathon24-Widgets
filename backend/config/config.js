const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  apiKey: process.env.CB_KEY,
  apiSecret: process.env.CB_SECRET,
  baseUrl: process.env.BASE_URL_SANDBOX,
};