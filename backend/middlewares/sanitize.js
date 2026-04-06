const { sanitizeObject } = require('../utils/sanitize');

module.exports = (req, res, next) => {
  req.body = sanitizeObject(req.body);
  next();
};
