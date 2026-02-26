const express = require('express');
const config = require('./config');
const { setupWebhook } = require('./webhook');
const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

setupWebhook(app);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(config.server.port, () => {
  console.log(`WhatsApp Sales Agent running on port ${config.server.port}`);
});
