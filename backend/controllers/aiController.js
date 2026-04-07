const { matchedData } = require('express-validator');
const { chatCompletion } = require('../services/groqService');
const { addLog } = require('../models/aiLogModel');
const { sanitizeText } = require('../utils/sanitize');

const supportResponse = async (req, res, next) => {
  try {
    const { message, model } = matchedData(req);
    const cleanMessage = sanitizeText(message);

    const system = 'You are a customer support assistant for a small business. Be concise, friendly, and helpful. If you need more details, ask one focused question.';
    const reply = await chatCompletion({ system, user: cleanMessage, temperature: 0.3, model });

    addLog('messages', { type: 'support', message: cleanMessage, response: reply });

    res.json({ success: true, response: reply });
  } catch (error) {
    next(error);
  }
};
const detectIntent = async (req, res, next) => {
  try {
    const { message, model } = matchedData(req);
    const cleanMessage = sanitizeText(message);

    const system = 'Classify the user intent into one of these labels: greeting, product_inquiry, price_inquiry, delivery_question, complaint, order_request, general_support. Respond ONLY with a JSON object like {"intent":"label"}.';
    const raw = await chatCompletion({ system, user: cleanMessage, temperature: 0, model });

    let intent = 'general_support';
    try {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.intent) intent = parsed.intent;
    } catch (err) {
      if (raw) {
        intent = raw.replace(/[^a-z_]/gi, '').toLowerCase() || intent;
      }
    }

    addLog('intents', { message: cleanMessage, intent });

    res.json({ success: true, intent });
  } catch (error) {
    next(error);
  }
};
const salesReply = async (req, res, next) => {
  try {
    const { message, model } = matchedData(req);
    const cleanMessage = sanitizeText(message);

    const system = 'You are a sales assistant. Write a professional, persuasive reply that addresses the customer question and invites a next step. Keep it under 120 words.';
    const reply = await chatCompletion({ system, user: cleanMessage, temperature: 0.4, model });

    addLog('salesReplies', { message: cleanMessage, response: reply });

    res.json({ success: true, response: reply });
  } catch (error) {
    next(error);
  }
};

const productQA = async (req, res, next) => {
  try {
    const { question, productData, model } = matchedData(req);
    const cleanQuestion = sanitizeText(question);
    const cleanData = sanitizeText(productData);

    const system = 'You answer product questions using only the provided product data. If the data does not include the answer, say you need more product details.';
    const user = `Product data:\n${cleanData}\n\nQuestion:\n${cleanQuestion}`;
    const reply = await chatCompletion({ system, user, temperature: 0.2, model });

    addLog('productAnswers', { question: cleanQuestion, productData: cleanData, response: reply });

    res.json({ success: true, response: reply });
  } catch (error) {
    next(error);
  }
};
const summarize = async (req, res, next) => {
  try {
    const { conversation, model } = matchedData(req);
    const cleanConversation = sanitizeText(conversation);

    const system = 'Summarize the conversation in 3-5 bullet points. Keep it short and useful for a business owner.';
    const reply = await chatCompletion({ system, user: cleanConversation, temperature: 0.2, maxTokens: 256, model });

    addLog('summaries', { conversation: cleanConversation, summary: reply });

    res.json({ success: true, summary: reply });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  supportResponse,
  detectIntent,
  salesReply,
  productQA,
  summarize
};
