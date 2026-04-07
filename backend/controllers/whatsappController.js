const { startClient, stopClient, getStatus, setEnabled } = require('../services/whatsappService');
const db = require('../config/db');

const startWhatsApp = (req, res) => {
  const status = startClient();
  if (!status.enabled) {
    return res.json({ success: false, message: 'WhatsApp is disabled. Enable it first.', ...status });
  }
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

const setWhatsAppEnabled = (req, res) => {
  const enabled = Boolean(req.body?.enabled);
  const config = setEnabled(enabled);
  res.json({ success: true, config });
};

const getWhatsAppConfig = (req, res) => {
  const config = db.get('whatsappStates').find({ id: 'config' }).value();
  res.json({ success: true, config: config || { enabled: false } });
};

const getWhatsAppLogs = (req, res) => {
  const limit = Math.min(Number(req.query.limit || 50), 200);
  const logs = db.get('whatsappMessages').takeRight(limit).value();
  res.json({ success: true, logs });
};

module.exports = {
  startWhatsApp,
  stopWhatsApp,
  getWhatsAppStatus,
  getWhatsAppLogs,
  setWhatsAppEnabled,
  getWhatsAppConfig
};
