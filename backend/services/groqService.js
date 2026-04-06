const axios = require('axios');

const chatCompletion = async ({ system, user, temperature = 0.2, maxTokens = 512 }) => {
  const apiKey = process.env.GROQ_API_KEY;
  const baseUrl = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
  const model = process.env.MODEL || 'llama3-8b-8192';

  if (!apiKey) {
    const error = new Error('GROQ_API_KEY is not set');
    error.status = 500;
    throw error;
  }

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
};

module.exports = { chatCompletion };
