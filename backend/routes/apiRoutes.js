const express = require('express');
const branchController = require('../controller/branchController');
const exchangeController = require('../controller/exchangeController');
const accountController = require('../controller/accountController');
const cashFlowController = require('../controller/cashFlowController'); // Import the controller
const transferController = require('../controller/transferController'); // Or use transferController if created
const supplierPaymentController = require('../controller/supplierPaymentController');
const taxComplianceController = require('../controller/taxComplianceController');


const router = express.Router();

// Branch finder routes
router.get('/branches', branchController.getBranches);

// Currency exchange routes
router.get('/currencies', exchangeController.getSupportedCurrencies); // Get supported currencies from local JSON
router.get('/exchange-rate', exchangeController.getLatestExchangeRates); // Get latest exchange rates dynamically
router.get('/convert-currency', exchangeController.convertCurrency); // Convert currency using the external API
// Add the route for account summary
router.get('/account-summary/:accountId', accountController.getAccountSummary);
router.get('/account-ids', accountController.getAccountIds);
router.get('/cash-flow', cashFlowController.getCashFlowData);
router.get('/account-balances', transferController.getAccountBalances);
router.post('/quick-transfer', transferController.quickTransfer);
// Supplier Payment Tracker routes
router.get('/supplier-payments', supplierPaymentController.getSupplierPayments);
router.get('/supplier-payments/:supplierId', supplierPaymentController.getSupplierPaymentById);
// Tax compliance data route
router.get('/tax-compliance', taxComplianceController.getTaxComplianceData);

module.exports = router;
