const express = require('express');
const branchController = require('../controller/branchController');
const exchangeController = require('../controller/exchangeController');
const router = express.Router();

// Branch finder routes
router.get('/branches', branchController.getBranches);

// Currency exchange routes
router.get('/currencies', exchangeController.getSupportedCurrencies); // Get supported currencies from local JSON
router.get('/exchange-rate', exchangeController.getLatestExchangeRates); // Get latest exchange rates dynamically
router.get('/convert-currency', exchangeController.convertCurrency); // Convert currency using the external API

module.exports = router;
