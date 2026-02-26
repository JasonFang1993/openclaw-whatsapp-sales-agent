const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

const conversationHistory = new Map();

const SYSTEM_PROMPT = `你是一个专业的 WhatsApp 客服助手，负责回答客户的问题。请用友好、专业的方式回复，保持简洁明了。如果无法回答某个问题，请礼貌地告知客户。`;

class AIService {
  constructor() {
    this.apiKey = config.openai.apiKey;
    this.model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
    this.maxHistory = parseInt(process.env.MAX_HISTORY || '10');
  }

  getHistoryKey(phoneNumber) {
    return phoneNumber.replace(/[@c.us]/g, '');
  }

  getHistory(phoneNumber) {
    const key = this.getHistoryKey(phoneNumber);
    return conversationHistory.get(key) || [];
  }

  addToHistory(phoneNumber, role, content) {
    const key = this.getHistoryKey(phoneNumber);
    const history = this.getHistory(phoneNumber);
    
    history.push({ role, content });
    
    if (history.length > this.maxHistory) {
      history.shift();
    }
    
    conversationHistory.set(key, history);
  }

  clearHistory(phoneNumber) {
    const key = this.getHistoryKey(phoneNumber);
    conversationHistory.delete(key);
    logger.info('Conversation history cleared', { phoneNumber: key });
  }

  async chat(phoneNumber, message) {
    if (!this.apiKey) {
      logger.warn('OpenAI API key not configured');
      return '抱歉，AI 服务暂不可用。请稍后再试。';
    }

    this.addToHistory(phoneNumber, 'user', message);

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...this.getHistory(phoneNumber),
    ];

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: this.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      const reply = response.data.choices[0].message.content;
      this.addToHistory(phoneNumber, 'assistant', reply);
      
      logger.info('AI response generated', { phoneNumber: this.getHistoryKey(phoneNumber) });
      return reply;
    } catch (error) {
      logger.error('AI service error', { 
        phoneNumber: this.getHistoryKey(phoneNumber), 
        error: error.message 
      });
      return '抱歉，我现在无法回答您的问题。请稍后再试。';
    }
  }

  async chatWithContext(phoneNumber, message, context = {}) {
    let systemMessage = SYSTEM_PROMPT;
    
    if (context.customerName) {
      systemMessage += `\n客户姓名: ${context.customerName}`;
    }
    if (context.lastOrder) {
      systemMessage += `\n最近订单: ${context.lastOrder}`;
    }

    const key = this.getHistoryKey(phoneNumber);
    const history = this.getHistory(phoneNumber);
    
    const messages = [
      { role: 'system', content: systemMessage },
      ...history,
    ];

    if (!this.apiKey) {
      logger.warn('OpenAI API key not configured');
      return '抱歉，AI 服务暂不可用。请稍后再试。';
    }

    this.addToHistory(phoneNumber, 'user', message);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        this.model,
          messages: messages,
          temperature:  {
          model:0.7,
          max_tokens: 500,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      const reply = response.data.choices[0].message.content;
      this.addToHistory(phoneNumber, 'assistant', reply);
      
      logger.info('AI response generated with context', { phoneNumber: key });
      return reply;
    } catch (error) {
      logger.error('AI service error with context', { 
        phoneNumber: key, 
        error: error.message 
      });
      return '抱歉，我现在无法回答您的问题。请稍后再试。';
    }
  }

  getConversationStats(phoneNumber) {
    const key = this.getHistoryKey(phoneNumber);
    const history = this.getHistory(phoneNumber);
    return {
      phoneNumber: key,
      messageCount: history.length,
      messages: history,
    };
  }
}

const aiService = new AIService();

module.exports = {
  aiService,
  AIService,
};
