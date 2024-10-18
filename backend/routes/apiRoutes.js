const express = require('express');
const branchController = require('../controller/branchController');
const router = express.Router();

router.get('/branches', branchController.getBranches);

module.exports = router;