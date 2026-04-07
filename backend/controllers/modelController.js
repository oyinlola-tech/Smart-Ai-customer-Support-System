const { listGroqModels } = require('../services/groqService');

const getModels = async (req, res, next) => {
  try {
    const models = await listGroqModels();
    res.json({ success: true, models });
  } catch (error) {
    next(error);
  }
};

module.exports = { getModels };
