const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const widgetRoutes = require('./routes/widget');

// Initialize dotenv
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Add a root route to avoid "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Commerzbank Widget API');
});

// Use widget routes
app.use('/', widgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
