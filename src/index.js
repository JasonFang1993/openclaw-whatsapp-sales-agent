const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Import routes
const whatsapp = require('./whatsapp');

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/qr', (req, res) => {
    res.json({ message: 'Check server console for QR code' });
});

app.post('/send', async (req, res) => {
    const { to, message } = req.body;
    res.json({ message: 'Use WhatsApp Web directly' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`WhatsApp Sales Agent running on port ${PORT}`);
});
