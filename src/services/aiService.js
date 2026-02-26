// Simple AI Service - with mock fallback
const axios = require('axios');

const API_KEY = process.env.OPENAI_API_KEY;
const API_URL = 'https://api.minimax.chat/v1/text/chatcompletion_v2';

const conversationHistory = new Map();

const SYSTEM_PROMPT = `你是一个专业的 WhatsApp 客服助手，负责回答客户的问题。请用友好，专业的方式回复，保持简洁明了。`;

// Mock responses for testing
const MOCK_RESPONSES = {
    '你好': '您好！欢迎咨询，有什么可以帮您的？',
    '产品': '我们提供高质量的产品和服务，您可以告诉我您的具体需求。',
    '价格': '我们的产品价格实惠，性价比很高。请问您对哪款产品感兴趣？',
    '购买': '好的，您可以直接下单，我们会尽快为您处理。',
    '默认': '感谢您的咨询！我们的客服会尽快回复您。'
};

function getMockResponse(message) {
    const lowerMsg = message.toLowerCase();
    for (const [key, response] of Object.entries(MOCK_RESPONSES)) {
        if (lowerMsg.includes(key)) {
            return response;
        }
    }
    return MOCK_RESPONSES['默认'];
}

async function getResponse(message, userId) {
    // If no API key, use mock
    if (!API_KEY || API_KEY === 'your-api-key') {
        console.log('🤖 Using mock response (no API key)');
        return getMockResponse(message);
    }
    
    // Get history
    const history = conversationHistory.get(userId) || [];
    
    // Add user message
    history.push({ role: 'user', content: message });
    
    try {
        const response = await axios.post(API_URL, {
            model: 'abab6.5s-chat',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...history.slice(-10)
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        const aiResponse = response.data.choices[0].message.content;
        
        // Add AI response to history
        history.push({ role: 'assistant', content: aiResponse });
        conversationHistory.set(userId, history);
        
        return aiResponse;
    } catch (error) {
        console.error('AI Error:', error.message);
        return getMockResponse(message);
    }
}

module.exports = { getResponse };
