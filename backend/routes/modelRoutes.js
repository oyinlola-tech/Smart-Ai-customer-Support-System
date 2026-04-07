const express = require('express');
const { getModels } = require('../controllers/modelController');

const router = express.Router();

/**
 * @swagger
 * /api/models:
 *   get:
 *     summary: List available Groq models
 *     tags: [Models]
 *     responses:
 *       200:
 *         description: Model list
 */
router.get('/', getModels);

module.exports = router;
