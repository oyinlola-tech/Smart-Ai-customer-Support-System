import { initRouter, showSection } from './router.js';
import { checkApiHealth, setStatus } from './ui.js';
import {
  request,
  fetchModels,
  fetchOnboardingStatus,
  updateOnboardingProfile,
  resetOnboarding,
  fetchWhatsAppStatus,
  startWhatsApp,
  stopWhatsApp,
  fetchWhatsAppLogs,
  fetchWhatsAppConfig,
  updateWhatsAppConfig
} from './api.js';

const modelSelect = document.getElementById('model-select');
const modelAuto = document.getElementById('model-auto');
const modelStatus = document.getElementById('model-status');

let models = [];
let modelIndex = 0;
const loadModelSettings = () => {
  const savedModel = localStorage.getItem('model.selected');
  const autoStored = localStorage.getItem('model.auto');
  const auto = autoStored === null ? true : autoStored === 'true';
  modelAuto.checked = auto;
  return { savedModel, auto };
};

const setModelStatus = (text) => {
  modelStatus.textContent = text;
};

const populateModels = (items, savedModel) => {
  modelSelect.innerHTML = '';
  items.forEach((model) => {
    const option = document.createElement('option');
    option.value = model.id;
    option.textContent = model.id;
    modelSelect.appendChild(option);
  });

  if (savedModel && items.find((m) => m.id === savedModel)) {
    modelSelect.value = savedModel;
    modelIndex = items.findIndex((m) => m.id === savedModel);
  } else if (items.length > 0) {
    modelSelect.value = items[0].id;
    modelIndex = 0;
  }
};
const getActiveModel = () => {
  if (!models.length) return null;
  if (modelAuto.checked) {
    const model = models[modelIndex % models.length].id;
    modelIndex += 1;
    localStorage.setItem('model.selected', model);
    return model;
  }
  return modelSelect.value;
};

const withModel = (payload) => {
  const model = getActiveModel();
  return model ? { ...payload, model } : payload;
};

const initModels = async () => {
  try {
    const data = await fetchModels();
    models = data;
    const { savedModel, auto } = loadModelSettings();
    populateModels(models, savedModel);
    if (auto) {
      setModelStatus('Auto-rotate enabled by default.');
    } else {
      setModelStatus(models.length ? 'Models ready.' : 'No models returned.');
    }
  } catch (err) {
    setModelStatus('Failed to load models. Check your API key.');
  }
};

modelSelect.addEventListener('change', () => {
  localStorage.setItem('model.selected', modelSelect.value);
});

modelAuto.addEventListener('change', () => {
  localStorage.setItem('model.auto', modelAuto.checked ? 'true' : 'false');
  setModelStatus(modelAuto.checked ? 'Auto-rotate enabled.' : 'Auto-rotate off.');
});
const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const chatStatus = document.getElementById('chat-status');

const addChatBubble = (text, role) => {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
};
document.getElementById('chat-send').addEventListener('click', async () => {
  const message = chatInput.value.trim();
  if (!message) return;
  addChatBubble(message, 'user');
  chatInput.value = '';
  setStatus(chatStatus, 'Generating response...');
  try {
    const data = await request('/ai/support', withModel({ message }));
    addChatBubble(data.response || 'No response received.', 'ai');
    setStatus(chatStatus, 'Response ready.');
  } catch (err) {
    setStatus(chatStatus, 'Could not reach AI service.', true);
  }
});
document.getElementById('sales-generate').addEventListener('click', async () => {
  const input = document.getElementById('sales-input');
  const output = document.getElementById('sales-output');
  const status = document.getElementById('sales-status');
  const message = input.value.trim();
  if (!message) return;
  setStatus(status, 'Generating reply...');
  try {
    const data = await request('/ai/sales-reply', withModel({ message }));
    output.textContent = data.response || 'No response received.';
    setStatus(status, 'Done.');
  } catch (err) {
    setStatus(status, 'Failed to generate reply.', true);
  }
});
document.getElementById('intent-detect').addEventListener('click', async () => {
  const input = document.getElementById('intent-input');
  const output = document.getElementById('intent-output');
  const status = document.getElementById('intent-status');
  const message = input.value.trim();
  if (!message) return;
  setStatus(status, 'Detecting intent...');
  try {
    const data = await request('/ai/intent', withModel({ message }));
    output.textContent = data.intent || 'general_support';
    setStatus(status, 'Done.');
  } catch (err) {
    setStatus(status, 'Failed to detect intent.', true);
  }
});
document.getElementById('product-answer').addEventListener('click', async () => {
  const questionEl = document.getElementById('product-question');
  const dataEl = document.getElementById('product-data');
  const output = document.getElementById('product-output');
  const status = document.getElementById('product-status');
  const question = questionEl.value.trim();
  const productData = dataEl.value.trim();
  if (!question || !productData) return;
  setStatus(status, 'Generating answer...');
  try {
    const data = await request('/ai/product-qa', withModel({
      question,
      productData
    }));
    output.textContent = data.response || 'No response received.';
    setStatus(status, 'Done.');
  } catch (err) {
    setStatus(status, 'Failed to generate answer.', true);
  }
});
document.getElementById('summary-generate').addEventListener('click', async () => {
  const input = document.getElementById('summary-input');
  const output = document.getElementById('summary-output');
  const status = document.getElementById('summary-status');
  const conversation = input.value.trim();
  if (!conversation) return;
  setStatus(status, 'Summarizing...');
  try {
    const data = await request('/ai/summarize', withModel({ conversation }));
    output.textContent = data.summary || 'No summary received.';
    setStatus(status, 'Done.');
  } catch (err) {
    setStatus(status, 'Failed to summarize.', true);
  }
});

initRouter();
checkApiHealth();
initModels();
showSection('dashboard');

const waStatus = document.getElementById('wa-status');
const waQr = document.getElementById('wa-qr');
const waStart = document.getElementById('wa-start');
const waStop = document.getElementById('wa-stop');
const waEnabled = document.getElementById('wa-enabled');
const onboardingProgressBar = document.getElementById('onboarding-progress-bar');
const onboardingProgressLabel = document.getElementById('onboarding-progress-label');
const onboardingSteps = document.getElementById('onboarding-steps');
const onboardingForm = document.getElementById('onboarding-form');
const onboardingSave = document.getElementById('onboarding-save');
const onboardingStatus = document.getElementById('onboarding-status');
const onboardingReset = document.getElementById('onboarding-reset');
const whatsappLogs = document.getElementById('whatsapp-logs');
const logsRefresh = document.getElementById('logs-refresh');
const setupBanner = document.getElementById('setup-banner');

const updateWhatsAppUI = (status) => {
  waStatus.textContent = status.status || 'unknown';
  waQr.textContent = status.qr ? 'Scan the QR shown in terminal.' : 'No QR currently.';
};

const loadWhatsAppStatus = async () => {
  try {
    const status = await fetchWhatsAppStatus();
    updateWhatsAppUI(status);
  } catch (err) {
    waStatus.textContent = 'offline';
  }
};

const loadWhatsAppConfig = async () => {
  try {
    const data = await fetchWhatsAppConfig();
    waEnabled.checked = Boolean(data.config?.enabled);
  } catch (err) {
    waEnabled.checked = false;
  }
};

waEnabled.addEventListener('change', async () => {
  await updateWhatsAppConfig(waEnabled.checked);
  await loadWhatsAppStatus();
});

waStart.addEventListener('click', async () => {
  waStatus.textContent = 'starting...';
  const status = await startWhatsApp();
  updateWhatsAppUI(status);
});

waStop.addEventListener('click', async () => {
  const status = await stopWhatsApp();
  updateWhatsAppUI(status);
});

const renderOnboardingSteps = (steps) => {
  onboardingSteps.innerHTML = steps
    .map((step) => `${step.done ? '[x]' : '[ ]'} ${step.question}`)
    .join('\n');
};

const renderOnboardingForm = (steps, profile) => {
  onboardingForm.innerHTML = '';
  steps.forEach((step) => {
    const wrapper = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = step.question;
    const input = document.createElement('textarea');
    input.rows = 2;
    input.name = step.key;
    input.value = profile[step.key] || '';
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    onboardingForm.appendChild(wrapper);
  });
};

const loadOnboardingStatus = async () => {
  try {
    const data = await fetchOnboardingStatus();
    const progress = data.progress || { completed: 0, total: 0, steps: [] };
    const percent = progress.total ? Math.round((progress.completed / progress.total) * 100) : 0;
    onboardingProgressBar.style.width = `${percent}%`;
    onboardingProgressLabel.textContent = `${percent}% complete`;
    if (percent < 100) {
      setupBanner.classList.add('show');
    } else {
      setupBanner.classList.remove('show');
    }
    renderOnboardingSteps(progress.steps || []);
    renderOnboardingForm(progress.steps || [], data.profile || {});
  } catch (err) {
    onboardingProgressBar.style.width = '0%';
    onboardingProgressLabel.textContent = '0% complete';
    setupBanner.classList.add('show');
  }
};

onboardingSave.addEventListener('click', async () => {
  const fields = onboardingForm.querySelectorAll('textarea, input');
  const payload = {};
  fields.forEach((field) => {
    payload[field.name] = field.value.trim();
  });
  onboardingStatus.textContent = 'Saving...';
  try {
    await updateOnboardingProfile(payload);
    onboardingStatus.textContent = 'Saved.';
    await loadOnboardingStatus();
  } catch (err) {
    onboardingStatus.textContent = 'Save failed.';
  }
});

onboardingReset.addEventListener('click', async () => {
  await resetOnboarding();
  await loadOnboardingStatus();
});

const loadWhatsAppLogs = async () => {
  try {
    const data = await fetchWhatsAppLogs(50);
    const logs = data.logs || [];
    whatsappLogs.textContent = logs
      .map((log) => `${log.createdAt} ${log.direction}: ${log.text}`)
      .join('\n');
  } catch (err) {
    whatsappLogs.textContent = 'Unable to load logs.';
  }
};

logsRefresh.addEventListener('click', loadWhatsAppLogs);

loadWhatsAppStatus();
loadWhatsAppConfig();
loadOnboardingStatus();
loadWhatsAppLogs();
