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
