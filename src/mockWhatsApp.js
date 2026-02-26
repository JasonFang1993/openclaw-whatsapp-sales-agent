// Mock WhatsApp Service for Testing
// This simulates WhatsApp without real connection

class MockWhatsApp {
    constructor() {
        this.connected = false;
        this.messageHandler = null;
    }

    initialize() {
        return new Promise((resolve) => {
            console.log('🔄 Initializing Mock WhatsApp...');
            setTimeout(() => {
                this.connected = true;
                console.log('✅ Mock WhatsApp is ready!');
                resolve();
            }, 1000);
        });
    }

    on(event, handler) {
        if (event === 'message') {
            this.messageHandler = handler;
            console.log('📬 Message handler registered');
        }
    }

    // Simulate receiving a message
    simulateMessage(from, message) {
        if (this.messageHandler) {
            const mockMsg = {
                from: from,
                to: 'me',
                body: message,
                reply: (response) => {
                    console.log(`📤 Mock reply to ${from}: ${response}`);
                    return Promise.resolve();
                }
            };
            this.messageHandler(mockMsg);
        }
    }

    sendMessage(to, message) {
        console.log(`📤 Mock sending to ${to}: ${message}`);
        return Promise.resolve({ id: 'mock-' + Date.now() });
    }

    getInfo() {
        return {
            wid: 'mock-user@c.us',
            pushname: 'Test User',
            me: 'mock-me@c.us'
        };
    }
}

module.exports = new MockWhatsApp();
