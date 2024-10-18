const express = require('express');
const config = require('./config/config');
const cors = require('cors');
const widgetRoutes = require('./routes/widget');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Add a root route to avoid "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Commerzbank Widget API');
});

// Use widget and API routes
app.use('/', widgetRoutes);
app.use('/api', apiRoutes);

const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
