const API_BASE = 'http://localhost:5000/api';

export const request = async (path, payload) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Request failed');
  }
  return res.json();
};
export const fetchModels = async () => {
  const res = await fetch(`${API_BASE}/models`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to load models');
  }
  const data = await res.json();
  return data.models || [];
};

export const fetchOnboardingStatus = async () => {
  const res = await fetch(`${API_BASE}/onboarding/status`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to load onboarding status');
  }
  return res.json();
};

export const updateOnboardingProfile = async (payload) => {
  const res = await fetch(`${API_BASE}/onboarding/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to update profile');
  }
  return res.json();
};

export const resetOnboarding = async () => {
  const res = await fetch(`${API_BASE}/onboarding/reset`, { method: 'POST' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to reset onboarding');
  }
  return res.json();
};

export const fetchWhatsAppStatus = async () => {
  const res = await fetch(`${API_BASE}/whatsapp/status`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to load WhatsApp status');
  }
  return res.json();
};

export const startWhatsApp = async () => {
  const res = await fetch(`${API_BASE}/whatsapp/start`, { method: 'POST' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to start WhatsApp');
  }
  return res.json();
};

export const stopWhatsApp = async () => {
  const res = await fetch(`${API_BASE}/whatsapp/stop`, { method: 'POST' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to stop WhatsApp');
  }
  return res.json();
};

export const fetchWhatsAppLogs = async (limit = 50) => {
  const res = await fetch(`${API_BASE}/whatsapp/logs?limit=${limit}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to load logs');
  }
  return res.json();
};
