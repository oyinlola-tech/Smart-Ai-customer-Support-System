const {
  onboardingSteps,
  getSetupState,
  getProfile,
  updateProfile,
  resetSetup,
  getProgress
} = require('../services/onboardingService');

const getOnboardingSteps = (req, res) => {
  res.json({ success: true, steps: onboardingSteps });
};

const getOnboardingStatus = (req, res) => {
  res.json({
    success: true,
    progress: getProgress(),
    profile: getProfile() || {},
    state: getSetupState() || {}
  });
};

const updateOnboardingProfile = (req, res, next) => {
  try {
    const profile = updateProfile(req.body || {});
    res.json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

const resetOnboarding = (req, res) => {
  resetSetup();
  res.json({ success: true });
};

module.exports = {
  getOnboardingSteps,
  getOnboardingStatus,
  updateOnboardingProfile,
  resetOnboarding
};
