const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { handleIncomingMessage } = require('./whatsappHandler');

let client = null;
let qrCode = null;
let status = 'stopped';

const getStatus = () => ({ status, qr: qrCode });

const startClient = () => {
  if (client) return getStatus();

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

module.exports = { startClient, stopClient, getStatus };
