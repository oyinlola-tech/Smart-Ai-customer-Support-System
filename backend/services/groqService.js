const axios = require('axios');

const chatCompletion = async ({ system, user, temperature = 0.2, maxTokens = 512, model: modelOverride }) => {
  const apiKey = process.env.GROQ_API_KEY;
  const baseUrl = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
  const model = modelOverride || process.env.MODEL;

  if (!apiKey) {
    const error = new Error('GROQ_API_KEY is not set');
    error.status = 500;
    throw error;
  }
  if (!model) {
    const error = new Error('MODEL is not set. Update your .env with a supported Groq model.');
    error.status = 500;
    throw error;
  }

  try {
    const response = await axios.post(
      `${baseUrl}/chat/completions`,
      {
        model,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ],
        temperature,
        max_tokens: maxTokens
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 20000
      }
    );

    return response.data.choices?.[0]?.message?.content?.trim() || '';
  } catch (err) {
    const status = err.response?.status || 500;
    const details = err.response?.data?.error?.message || 'Groq API error';
    const error = new Error(details);
    error.status = status;
    throw error;
  }
};

const listGroqModels = async () => {
  const apiKey = process.env.GROQ_API_KEY;
  const baseUrl = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';

  if (!apiKey) {
    const error = new Error('GROQ_API_KEY is not set');
    error.status = 500;
    throw error;
  }

  try {
    const response = await axios.get(`${baseUrl}/models`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 20000
    });
    return response.data?.data || [];
  } catch (err) {
    const status = err.response?.status || 500;
    const details = err.response?.data?.error?.message || 'Groq API error';
    const error = new Error(details);
    error.status = status;
    throw error;
  }
};

module.exports = { chatCompletion, listGroqModels };
