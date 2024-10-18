const express = require('express');
const router = express.Router();

router.get('/widget-data', (req, res) => {
  // Sample data, you can replace it with actual business logic
  res.json({ message: 'Welcome to the Commerzbank widget!' });
});

module.exports = router;
