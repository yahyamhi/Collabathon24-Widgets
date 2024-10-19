const express = require('express');
const branchController = require('../controller/branchController');
const exchangeController = require('../controller/exchangeController');
const accountController = require('../controller/accountController');
const cashFlowController = require('../controller/cashFlowController'); // Import the controller

const router = express.Router();

// Branch finder routes
router.get('/branches', branchController.getBranches);

// Currency exchange routes
router.get('/currencies', exchangeController.getSupportedCurrencies); // Get supported currencies from local JSON
router.get('/exchange-rate', exchangeController.getLatestExchangeRates); // Get latest exchange rates dynamically
router.get('/convert-currency', exchangeController.convertCurrency); // Convert currency using the external API
// Add the route for account summary
router.get('/account-summary/:accountId', accountController.getAccountSummary);
router.get('/cash-flow', cashFlowController.getCashFlowData); // Add this line

module.exports = router;
