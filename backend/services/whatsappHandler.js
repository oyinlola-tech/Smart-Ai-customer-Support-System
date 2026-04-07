const db = require('../config/db');
const { chatCompletion } = require('./groqService');
const {
  onboardingSteps,
  getSetupState,
  saveSetupState,
  resetSetup,
  getProfile,
  saveProfile
} = require('./onboardingService');

const normalizeNumber = (value) => {
  if (!value) return null;
  const digits = value.replace(/\D/g, '');
  return digits ? `${digits}@c.us` : null;
};

const logMessage = (chatId, direction, text) => {
  db.get('whatsappMessages')
    .push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      chatId,
      direction,
      text,
      createdAt: new Date().toISOString()
    })
    .write();
};

const buildSystemPrompt = (profile) => {
  return `You are a customer support assistant for ${profile.business_name}.\n` +
    `Business type: ${profile.business_type}.\n` +
    `Description: ${profile.business_description}.\n` +
    `Products count: ${profile.products_count}.\n` +
    `Top products: ${profile.top_products}.\n` +
    `Price range: ${profile.price_range}.\n` +
    `Payment methods: ${profile.payment_methods}.\n` +
    `Delivery areas: ${profile.delivery_areas}.\n` +
    `Delivery times: ${profile.delivery_times}.\n` +
    `Return policy: ${profile.return_policy}.\n` +
    `Business hours: ${profile.business_hours}.\n` +
    `Contact details: ${profile.contact_details}.\n` +
    `Tone: ${profile.tone}.\n` +
    `Be concise and helpful. Ask one focused question if needed.`;
};

const handleOwnerSetup = async (message, send) => {
  const state = getSetupState() || {
    id: 'setup',
    step: 0,
    started: false,
    answers: {},
    ownerId: message.from
  };

  if (!state.started) {
    state.started = true;
    saveSetupState(state);
    await send('Let\'s set up your business profile.');
    await send(onboardingSteps[0].question);
    return;
  }

  const currentStep = onboardingSteps[state.step];
  if (!currentStep) {
    await send('Setup is already complete. Reply \"reset setup\" to start over.');
    return;
  }

  state.answers[currentStep.key] = message.body.trim();
  state.step += 1;

  if (state.step >= onboardingSteps.length) {
    const profile = {
      id: 'default',
      ...state.answers,
      completed: true,
      updatedAt: new Date().toISOString()
    };
    saveProfile(profile);
    saveSetupState({ ...state, completed: true });
    await send('Setup complete. Your AI assistant is now ready.');
    return;
  }

  saveSetupState(state);
  await send(onboardingSteps[state.step].question);
};

const handleCustomerMessage = async (message, send) => {
  const profile = getProfile();
  if (!profile || !profile.completed) {
    await send('Business setup is still in progress. Please check back soon.');
    return;
  }

  const system = buildSystemPrompt(profile);
  const reply = await chatCompletion({ system, user: message.body.trim(), temperature: 0.3 });
  await send(reply || 'Sorry, I could not generate a response.');
};

const handleIncomingMessage = async (message) => {
  if (!message.body || message.from.endsWith('@g.us')) return;

  const ownerEnv = normalizeNumber(process.env.WA_OWNER_NUMBER);
  const state = getSetupState();
  const ownerId = ownerEnv || state?.ownerId || message.from;

  if (!ownerEnv && (!state || !state.ownerId)) {
    saveSetupState({
      id: 'setup',
      step: 0,
      started: false,
      answers: {},
      ownerId
    });
  }

  const send = async (text) => {
    await message.reply(text);
    logMessage(message.from, 'outbound', text);
  };

  logMessage(message.from, 'inbound', message.body.trim());

  const lower = message.body.trim().toLowerCase();
  if (message.from === ownerId) {
    if (lower === 'reset setup') {
      resetSetup();
      await send('Setup reset. Complete onboarding in the dashboard.');
      return;
    }
    const profile = getProfile();
    if (!profile || !profile.completed) {
      await send('Finish onboarding in the dashboard to activate replies.');
      return;
    }
    await handleCustomerMessage(message, send);
    return;
  }

  await handleCustomerMessage(message, send);
};

module.exports = { handleIncomingMessage };
