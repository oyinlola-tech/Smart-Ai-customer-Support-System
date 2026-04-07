const express = require('express');
const {
  getOnboardingSteps,
  getOnboardingStatus,
  updateOnboardingProfile,
  resetOnboarding
} = require('../controllers/onboardingController');

const router = express.Router();

/**
 * @swagger
 * /api/onboarding/steps:
 *   get:
 *     summary: List onboarding steps
 *     tags: [Onboarding]
 *     responses:
 *       200:
 *         description: Step list
 */
router.get('/steps', getOnboardingSteps);

/**
 * @swagger
 * /api/onboarding/status:
 *   get:
 *     summary: Onboarding progress and profile
 *     tags: [Onboarding]
 *     responses:
 *       200:
 *         description: Status
 */
router.get('/status', getOnboardingStatus);

/**
 * @swagger
 * /api/onboarding/profile:
 *   put:
 *     summary: Update onboarding profile
 *     tags: [Onboarding]
 *     responses:
 *       200:
 *         description: Updated profile
 */
router.put('/profile', updateOnboardingProfile);

/**
 * @swagger
 * /api/onboarding/reset:
 *   post:
 *     summary: Reset onboarding
 *     tags: [Onboarding]
 *     responses:
 *       200:
 *         description: Reset
 */
router.post('/reset', resetOnboarding);

module.exports = router;
