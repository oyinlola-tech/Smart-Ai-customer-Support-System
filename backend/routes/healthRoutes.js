const express = require('express');
const { healthCheck } = require('../controllers/healthController');

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: System status
 */
router.get('/', healthCheck);

module.exports = router;
