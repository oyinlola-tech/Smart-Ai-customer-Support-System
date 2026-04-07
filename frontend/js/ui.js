export const setStatus = (el, message, isError = false) => {
  el.textContent = message;
  el.style.opacity = isError ? '1' : '0.7';
};

export const checkApiHealth = async () => {
  const el = document.getElementById('api-status');
  try {
    const res = await fetch('http://localhost:5000/api/health');
    if (!res.ok) throw new Error('Offline');
    el.textContent = 'Online';
    el.style.opacity = '1';
  } catch (err) {
    el.textContent = 'Offline';
    el.style.opacity = '0.7';
  }
};
