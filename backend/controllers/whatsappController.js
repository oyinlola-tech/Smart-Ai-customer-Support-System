const { startClient, stopClient, getStatus } = require('../services/whatsappService');
const db = require('../config/db');

const startWhatsApp = (req, res) => {
  const status = startClient();
  res.json({ success: true, ...status });
};

const stopWhatsApp = async (req, res, next) => {
  try {
    const status = await stopClient();
    res.json({ success: true, ...status });
  } catch (error) {
    next(error);
  }
};

const getWhatsAppStatus = (req, res) => {
  res.json({ success: true, ...getStatus() });
};

const getWhatsAppLogs = (req, res) => {
  const limit = Math.min(Number(req.query.limit || 50), 200);
  const logs = db.get('whatsappMessages').takeRight(limit).value();
  res.json({ success: true, logs });
};

module.exports = { startWhatsApp, stopWhatsApp, getWhatsAppStatus, getWhatsAppLogs };
