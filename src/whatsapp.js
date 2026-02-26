const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode');
const config = require('./config');
const aiService = require('./services/aiService');

const app = express();
app.use(express.json());

// WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: '.wwebjs-auth'
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// QR Code
client.on('qr', async (qr) => {
    console.log('QR Code received, scan with your WhatsApp');
    const qrImage = await qrcode.toDataURL(qr);
    console.log('QR Code URL:', qrImage);
});

// Ready
client.on('ready', () => {
    console.log('WhatsApp is ready!');
});

// Message handler
client.on('message', async (message) => {
    console.log(`Message from ${message.from}: ${message.body}`);
    
    // Don't respond to self
    if (message.from === message.to) return;
    
    try {
        // Get AI response
        const response = await aiService.getResponse(message.body, message.from);
        
        // Send response
        await message.reply(response);
        console.log(`Replied to ${message.from}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// API Routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok', whatsapp: client.info ? 'ready' : 'not_ready' });
});

app.get('/qr', async (req, res) => {
    // This will return a placeholder - the actual QR is logged to console
    res.json({ message: 'Check server console for QR code' });
});

app.post('/send', async (req, res) => {
    const { to, message } = req.body;
    try {
        await client.sendMessage(to, message);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/status', (req, res) => {
    res.json({ 
        status: client.info ? 'ready' : 'not_ready',
        info: client.info 
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Initializing WhatsApp...');
    client.initialize();
});
