const sanitizeText = (value) => {
  if (typeof value !== 'string') return value;
  return value
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const sanitizeObject = (payload) => {
  if (!payload || typeof payload !== 'object') return payload;
  if (Array.isArray(payload)) return payload.map(sanitizeObject);

  const clean = {};
  Object.keys(payload).forEach((key) => {
    clean[key] = sanitizeObject(payload[key]);
  });
  return clean;
};

module.exports = { sanitizeText, sanitizeObject };
