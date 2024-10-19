const express = require('express');
const branchController = require('../controller/branchController');
const accountController = require('../controller/accountController');
const router = express.Router();

router.get('/branches', branchController.getBranches);

// Add the route for account summary
router.get('/account-summary/:accountId', accountController.getAccountSummary);

module.exports = router;
