const config = require('./config');
const { wahaClient } = require('./services/waService');
const { aiService } = require('./services/aiService');
const logger = require('./utils/logger');

function setupWebhook(app) {
  app.post('/webhook', async (req, res) => {
    const { event, payload } = req.body;

    logger.info('Webhook received', { event });

    try {
      switch (event) {
        case 'message':
          await handleMessage(payload);
          break;
        case 'sessionStatusChanged':
          await handleSessionStatus(payload);
          break;
        case 'messageAck':
          await handleMessageAck(payload);
          break;
        case 'bot':
          await handleBotEvent(payload);
          break;
        default:
          logger.info('Unknown event received', { event });
      }
    } catch (error) {
      logger.error('Error handling webhook', { event, error: error.message });
    }

    res.status(200).send('OK');
  });
}

async function handleMessage(payload) {
  const { from, body, ack, id, type, session } = payload;

  if (type === 'notification') {
    logger.info('Notification received', { from, notificationType: payload.notificationType });
    return;
  }

  if (!body || !body.trim()) {
    logger.info('Empty message received', { from, id });
    return;
  }

  logger.info('Message received', { from, body: body.substring(0, 50), type });

  try {
    await wahaClient.setTyping(from, true);

    const reply = await aiService.chat(from, body);

    await wahaClient.setTyping(from, false);

    await wahaClient.sendMessage(from, reply);

    await wahaClient.markAsRead(from);

    logger.info('Reply sent', { from, replyLength: reply.length });
  } catch (error) {
    logger.error('Failed to process message', { from, error: error.message });
    
    try {
      await wahaClient.setTyping(from, false);
      await wahaClient.sendMessage(from, '抱歉，处理您的消息时出现错误。请稍后再试。');
    } catch (sendError) {
      logger.error('Failed to send error message', { from, error: sendError.message });
    }
  }
}

async function handleSessionStatus(payload) {
  const { session, status } = payload;
  
  logger.info('Session status changed', { session, status });

  if (status === 'started') {
    logger.info('WhatsApp session is now connected and ready');
  } else if (status === 'stopped') {
    logger.info('WhatsApp session has been stopped');
  } else if (status === 'failed') {
    logger.error('WhatsApp session failed', { session });
  }
}

async function handleMessageAck(payload) {
  const { id, ack, chatId } = payload;
  
  logger.debug('Message ack received', { id, ack, chatId });
}

async function handleBotEvent(payload) {
  const { action, session } = payload;
  
  logger.info('Bot event received', { action, session });
}

module.exports = { setupWebhook };
