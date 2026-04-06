const express = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const {
  supportResponse,
  detectIntent,
  salesReply,
  productQA,
  summarize
} = require('../controllers/aiController');

const router = express.Router();

/**
 * @swagger
 * /api/ai/support:
 *   post:
 *     summary: Generate support response
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             required:
 *               - message
 *     responses:
 *       200:
 *         description: Support response
 */
router.post(
  '/support',
  body('message').isString().isLength({ min: 2, max: 2000 }),
  validate,
  supportResponse
);
/**
 * @swagger
 * /api/ai/intent:
 *   post:
 *     summary: Detect customer intent
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             required:
 *               - message
 *     responses:
 *       200:
 *         description: Intent result
 */
router.post(
  '/intent',
  body('message').isString().isLength({ min: 2, max: 2000 }),
  validate,
  detectIntent
);

/**
 * @swagger
 * /api/ai/sales-reply:
 *   post:
 *     summary: Generate sales reply
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             required:
 *               - message
 *     responses:
 *       200:
 *         description: Sales reply
 */
router.post(
  '/sales-reply',
  body('message').isString().isLength({ min: 2, max: 2000 }),
  validate,
  salesReply
);
/**
 * @swagger
 * /api/ai/product-qa:
 *   post:
 *     summary: Answer product questions
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               productData:
 *                 type: string
 *             required:
 *               - question
 *               - productData
 *     responses:
 *       200:
 *         description: Product answer
 */
router.post(
  '/product-qa',
  body('question').isString().isLength({ min: 2, max: 2000 }),
  body('productData').isString().isLength({ min: 2, max: 5000 }),
  validate,
  productQA
);

/**
 * @swagger
 * /api/ai/summarize:
 *   post:
 *     summary: Summarize conversation
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conversation:
 *                 type: string
 *             required:
 *               - conversation
 *     responses:
 *       200:
 *         description: Summary
 */
router.post(
  '/summarize',
  body('conversation').isString().isLength({ min: 10, max: 10000 }),
  validate,
  summarize
);

module.exports = router;
