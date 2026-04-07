import { initRouter, showSection } from './router.js';
import { checkApiHealth, setStatus } from './ui.js';
import { request, fetchModels } from './api.js';

const modelSelect = document.getElementById('model-select');
const modelAuto = document.getElementById('model-auto');
const modelStatus = document.getElementById('model-status');

let models = [];
let modelIndex = 0;
const loadModelSettings = () => {
  const savedModel = localStorage.getItem('model.selected');
  const auto = localStorage.getItem('model.auto') === 'true';
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

const initModels = async () => {
  try {
    const data = await fetchModels();
    models = data;
    const { savedModel } = loadModelSettings();
    populateModels(models, savedModel);
    setModelStatus(models.length ? 'Models ready.' : 'No models returned.');
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
    const data = await request('/ai/support', { message, model: getActiveModel() });
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
    const data = await request('/ai/sales-reply', { message, model: getActiveModel() });
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
    const data = await request('/ai/intent', { message, model: getActiveModel() });
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
    const data = await request('/ai/product-qa', {
      question,
      productData,
      model: getActiveModel()
    });
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
    const data = await request('/ai/summarize', { conversation, model: getActiveModel() });
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
