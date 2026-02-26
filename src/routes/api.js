const express = require('express');
const { wahaClient } = require('../services/waService');
const { aiService } = require('../services/aiService');
const logger = require('../utils/logger');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.get('/session', async (req, res) => {
  try {
    const status = await wahaClient.getSessionStatus();
    res.json(status);
  } catch (error) {
    logger.error('Failed to get session status', { error: error.message });
    res.status(500).json({ error: 'Failed to get session status' });
  }
});

router.post('/session/start', async (req, res) => {
  try {
    const result = await wahaClient.startSession();
    res.json(result);
  } catch (error) {
    logger.error('Failed to start session', { error: error.message });
    res.status(500).json({ error: 'Failed to start session' });
  }
});

router.post('/session/stop', async (req, res) => {
  try {
    const result = await wahaClient.stopSession();
    res.json(result);
  } catch (error) {
    logger.error('Failed to stop session', { error: error.message });
    res.status(500).json({ error: 'Failed to stop session' });
  }
});

router.get('/chats', async (req, res) => {
  try {
    const chats = await wahaClient.getChats();
    res.json(chats);
  } catch (error) {
    logger.error('Failed to get chats', { error: error.message });
    res.status(500).json({ error: 'Failed to get chats' });
  }
});

router.get('/chat/:chatId/messages', async (req, res) => {
  try {
    const { chatId } = req.params;
    const { limit = 10 } = req.query;
    const messages = await wahaClient.getChatMessages(chatId, parseInt(limit));
    res.json(messages);
  } catch (error) {
    logger.error('Failed to get chat messages', { error: error.message });
    res.status(500).json({ error: 'Failed to get chat messages' });
  }
});

router.post('/send', async (req, res) => {
  try {
    const { chatId, text, mediaUrl, caption, latitude, longitude, title, url } = req.body;

    if (!chatId) {
      return res.status(400).json({ error: 'chatId is required' });
    }

    let result;

    if (latitude && longitude) {
      result = await wahaClient.sendLocation(chatId, latitude, longitude, title);
    } else if (mediaUrl) {
      result = await wahaClient.sendMedia(chatId, mediaUrl, caption);
    } else if (url) {
      result = await wahaClient.sendLinkPreview(chatId, url, text);
    } else if (text) {
      result = await wahaClient.sendMessage(chatId, text);
    } else {
      return res.status(400).json({ error: 'No message content provided' });
    }

    res.json(result);
  } catch (error) {
    logger.error('Failed to send message', { error: error.message });
    res.status(500).json({ error: 'Failed to send message' });
  }
});

router.delete('/history/:phoneNumber', (req, res) => {
  try {
    const { phoneNumber } = req.params;
    aiService.clearHistory(phoneNumber);
    res.json({ success: true, message: 'History cleared' });
  } catch (error) {
    logger.error('Failed to clear history', { error: error.message });
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

router.get('/history/:phoneNumber', (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const stats = aiService.getConversationStats(phoneNumber);
    res.json(stats);
  } catch (error) {
    logger.error('Failed to get history', { error: error.message });
    res.status(500).json({ error: 'Failed to get history' });
  }
});

router.get('/conversations', (req, res) => {
  res.json({ messageCount: aiService.conversationHistory?.size || 0 });
});

module.exports = router;
