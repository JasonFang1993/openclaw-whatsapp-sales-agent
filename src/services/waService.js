const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

const BASE_URL = config.waha.url;
const SESSION = config.waha.session;

class WAHAClient {
  constructor() {
    this.baseUrl = BASE_URL;
    this.session = SESSION;
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
    });
  }

  async sendMessage(chatId, text) {
    try {
      const response = await this.client.post(`/api/sendText/${this.session}`, {
        chatId: chatId,
        text: text,
      });
      logger.info('Message sent successfully', { chatId, messageId: response.data.id });
      return response.data;
    } catch (error) {
      logger.error('Failed to send message', { chatId, error: error.message });
      throw error;
    }
  }

  async sendMedia(chatId, mediaUrl, caption) {
    try {
      const response = await this.client.post(`/api/sendMedia/${this.session}`, {
        chatId: chatId,
        url: mediaUrl,
        caption: caption || '',
      });
      logger.info('Media sent successfully', { chatId, mediaUrl });
      return response.data;
    } catch (error) {
      logger.error('Failed to send media', { chatId, error: error.message });
      throw error;
    }
  }

  async sendLocation(chatId, latitude, longitude, title) {
    try {
      const response = await this.client.post(`/api/sendLocation/${this.session}`, {
        chatId: chatId,
        latitude: latitude,
        longitude: longitude,
        title: title || '',
      });
      logger.info('Location sent successfully', { chatId, latitude, longitude });
      return response.data;
    } catch (error) {
      logger.error('Failed to send location', { chatId, error: error.message });
      throw error;
    }
  }

  async sendLinkPreview(chatId, url, text) {
    try {
      const response = await this.client.post(`/api/sendLinkPreview/${this.session}`, {
        chatId: chatId,
        url: url,
        text: text || '',
      });
      logger.info('Link preview sent successfully', { chatId, url });
      return response.data;
    } catch (error) {
      logger.error('Failed to send link preview', { chatId, error: error.message });
      throw error;
    }
  }

  async getChatMessages(chatId, limit = 10) {
    try {
      const response = await this.client.get(`/api/chats/${this.session}/${chatId}`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      logger.error('Failed to get chat messages', { chatId, error: error.message });
      throw error;
    }
  }

  async getChats() {
    try {
      const response = await this.client.get(`/api/chats/${this.session}`);
      return response.data;
    } catch (error) {
      logger.error('Failed to get chats', { error: error.message });
      throw error;
    }
  }

  async getSessionStatus() {
    try {
      const response = await this.client.get(`/api/sessions/${this.session}`);
      return response.data;
    } catch (error) {
      logger.error('Failed to get session status', { error: error.message });
      throw error;
    }
  }

  async startSession() {
    try {
      const response = await this.client.post(`/api/sessions/${this.session}/start`);
      logger.info('Session started', { session: this.session });
      return response.data;
    } catch (error) {
      logger.error('Failed to start session', { error: error.message });
      throw error;
    }
  }

  async stopSession() {
    try {
      const response = await this.client.post(`/api/sessions/${this.session}/stop`);
      logger.info('Session stopped', { session: this.session });
      return response.data;
    } catch (error) {
      logger.error('Failed to stop session', { error: error.message });
      throw error;
    }
  }

  async setTyping(chatId, isTyping) {
    try {
      const endpoint = isTyping ? 'startTyping' : 'stopTyping';
      await this.client.post(`/api/${endpoint}/${this.session}`, {
        chatId: chatId,
      });
    } catch (error) {
      logger.error('Failed to set typing status', { chatId, error: error.message });
    }
  }

  async markAsRead(chatId) {
    try {
      await this.client.post(`/api/chats/${this.session}/${chatId}/messages/ack`, {
        ack: 3,
      });
      logger.debug('Message marked as read', { chatId });
    } catch (error) {
      logger.error('Failed to mark as read', { chatId, error: error.message });
    }
  }
}

const wahaClient = new WAHAClient();

module.exports = {
  wahaClient,
  WAHAClient,
};
