const db = require('../config/db');

const onboardingSteps = [
  { key: 'business_name', question: 'What is your business name?' },
  { key: 'business_type', question: 'What type of business is it?' },
  { key: 'business_description', question: 'Describe what you sell in one or two sentences.' },
  { key: 'products_count', question: 'Roughly how many products do you have?' },
  { key: 'top_products', question: 'List your top products or categories.' },
  { key: 'price_range', question: 'What is your typical price range?' },
  { key: 'payment_methods', question: 'Which payment methods do you accept?' },
  { key: 'delivery_areas', question: 'Where do you deliver?' },
  { key: 'delivery_times', question: 'Typical delivery time?' },
  { key: 'return_policy', question: 'What is your return or refund policy?' },
  { key: 'business_hours', question: 'What are your business hours?' },
  { key: 'contact_details', question: 'Best contact details for customers?' },
  { key: 'tone', question: 'Preferred reply tone (friendly, formal, energetic, etc.)?' }
];

const getSetupState = () => db.get('whatsappStates').find({ id: 'setup' }).value();

const saveSetupState = (state) => {
  const existing = getSetupState();
  if (existing) {
    db.get('whatsappStates').find({ id: 'setup' }).assign(state).write();
  } else {
    db.get('whatsappStates').push(state).write();
  }
};

const resetSetup = () => {
  db.get('whatsappStates').remove({ id: 'setup' }).write();
  db.get('whatsappProfiles').remove({ id: 'default' }).write();
};

const getProfile = () => db.get('whatsappProfiles').find({ id: 'default' }).value();

const saveProfile = (profile) => {
  const existing = getProfile();
  if (existing) {
    db.get('whatsappProfiles').find({ id: 'default' }).assign(profile).write();
  } else {
    db.get('whatsappProfiles').push(profile).write();
  }
};

const updateProfile = (updates) => {
  const profile = getProfile() || { id: 'default' };
  const next = {
    ...profile,
    ...updates,
    completed: true,
    updatedAt: new Date().toISOString()
  };
  saveProfile(next);
  saveSetupState({
    id: 'setup',
    step: onboardingSteps.length,
    started: true,
    completed: true,
    answers: next
  });
  return next;
};

const getProgress = () => {
  const profile = getProfile() || {};
  const completedSteps = onboardingSteps.filter((step) => {
    const value = profile[step.key];
    return value !== undefined && value !== null && String(value).trim() !== '';
  }).length;

  return {
    total: onboardingSteps.length,
    completed: completedSteps,
    steps: onboardingSteps.map((step) => ({
      key: step.key,
      question: step.question,
      done: Boolean(profile[step.key])
    }))
  };
};

module.exports = {
  onboardingSteps,
  getSetupState,
  saveSetupState,
  resetSetup,
  getProfile,
  saveProfile,
  updateProfile,
  getProgress
};
