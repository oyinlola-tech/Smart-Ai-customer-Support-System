const express = require('express');
const {
  startWhatsApp,
  stopWhatsApp,
  getWhatsAppStatus,
  getWhatsAppLogs
} = require('../controllers/whatsappController');

const router = express.Router();

/**
 * @swagger
 * /api/whatsapp/status:
 *   get:
 *     summary: WhatsApp client status
 *     tags: [WhatsApp]
 *     responses:
 *       200:
 *         description: Status
 */
router.get('/status', getWhatsAppStatus);

/**
 * @swagger
 * /api/whatsapp/logs:
 *   get:
 *     summary: WhatsApp message logs
 *     tags: [WhatsApp]
 *     responses:
 *       200:
 *         description: Logs
 */
router.get('/logs', getWhatsAppLogs);

/**
 * @swagger
 * /api/whatsapp/start:
 *   post:
 *     summary: Start WhatsApp client
 *     tags: [WhatsApp]
 *     responses:
 *       200:
 *         description: Started
 */
router.post('/start', startWhatsApp);

/**
 * @swagger
 * /api/whatsapp/stop:
 *   post:
 *     summary: Stop WhatsApp client
 *     tags: [WhatsApp]
 *     responses:
 *       200:
 *         description: Stopped
 */
router.post('/stop', stopWhatsApp);

module.exports = router;
