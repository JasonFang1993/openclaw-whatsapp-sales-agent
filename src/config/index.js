require('dotenv').config();

module.exports = {
  waha: {
    url: process.env.WAHA_URL || 'http://localhost:3000',
    session: process.env.WAHA_SESSION || 'default',
  },
  server: {
    port: process.env.PORT || 3000,
    webhookUrl: process.env.WEBHOOK_URL || 'http://localhost:3000/webhook',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
};
