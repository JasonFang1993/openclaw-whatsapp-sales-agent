// Test Script - Simulates WhatsApp Bot
const mockWhatsApp = require('./src/mockWhatsApp');
const aiService = require('./src/services/aiService');

console.log('🧪 Starting WhatsApp Bot Test...\n');

// Initialize mock WhatsApp
mockWhatsApp.initialize().then(() => {
    console.log('\n📝 Testing message handling...\n');
    
    // Test 1: Customer asks about product
    console.log('=== Test 1: Customer asks about product ===');
    mockWhatsApp.simulateMessage('customer1@c.us', '你好，我想了解一下你们的产品');
    
    setTimeout(() => {
        // Test 2: Customer asks about price
        console.log('\n=== Test 2: Customer asks about price ===');
        mockWhatsApp.simulateMessage('customer2@c.us', '这个产品多少钱？');
        
        setTimeout(() => {
            // Test 3: Customer wants to buy
            console.log('\n=== Test 3: Customer wants to buy ===');
            mockWhatsApp.simulateMessage('customer3@c.us', '我想购买，怎么付款？');
            
            setTimeout(() => {
                console.log('\n✅ All tests completed!');
                process.exit(0);
            }, 3000);
        }, 3000);
    }, 3000);
});

// Register message handler with AI
mockWhatsApp.on('message', async (message) => {
    console.log(`\n📥 Received from ${message.from}: ${message.body}`);
    
    try {
        // Get AI response
        const response = await aiService.getResponse(message.body, message.from);
        
        // Send reply
        await message.reply(response);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
});
