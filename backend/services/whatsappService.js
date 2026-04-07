const qrcode = require('qrcode-terminal');
const db = require('../config/db');
const { handleIncomingMessage } = require('./whatsappHandler');

let client = null;
let qrCode = null;
let status = 'stopped';

const getStoredConfig = () => db.get('whatsappStates').find({ id: 'config' }).value();

const isEnabled = () => {
  const config = getStoredConfig();
  if (typeof config?.enabled === 'boolean') return config.enabled;
  return String(process.env.WA_ENABLED || '').toLowerCase() === 'true';
};

const setEnabled = (enabled) => {
  const existing = getStoredConfig();
  const next = { id: 'config', enabled: Boolean(enabled), updatedAt: new Date().toISOString() };
  if (existing) {
    db.get('whatsappStates').find({ id: 'config' }).assign(next).write();
  } else {
    db.get('whatsappStates').push(next).write();
  }
  return next;
};

const getStatus = () => ({ status: isEnabled() ? status : 'disabled', qr: qrCode, enabled: isEnabled() });

const startClient = () => {
  if (!isEnabled()) {
    return getStatus();
  }
  if (client) return getStatus();

  let Client;
  let LocalAuth;
  try {
    ({ Client, LocalAuth } = require('whatsapp-web.js'));
  } catch (err) {
    const error = new Error(
      'WhatsApp requires puppeteer. Install it with: npm install --prefix backend puppeteer'
    );
    error.status = 500;
    throw error;
  }

  client = new Client({
    authStrategy: new LocalAuth({ clientId: 'supportdesk' }),
    puppeteer: {
      headless: true,
      executablePath: process.env.WA_CHROME_PATH || undefined,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  });

  client.on('qr', (qr) => {
    qrCode = qr;
    status = 'qr';
    qrcode.generate(qr, { small: true });
  });

  client.on('authenticated', () => {
    status = 'authenticated';
  });

  client.on('ready', () => {
    status = 'ready';
    qrCode = null;
  });

  client.on('auth_failure', () => {
    status = 'auth_failure';
  });

  client.on('disconnected', () => {
    status = 'disconnected';
  });

  client.on('message', async (message) => {
    try {
      await handleIncomingMessage(message);
    } catch (err) {
      console.error('[WhatsApp] Message handler error:', err.message);
    }
  });

  client.initialize();
  status = 'starting';
  return getStatus();
};

const stopClient = async () => {
  if (!client) return getStatus();
  await client.destroy();
  client = null;
  qrCode = null;
  status = 'stopped';
  return getStatus();
};

module.exports = { startClient, stopClient, getStatus, setEnabled };
