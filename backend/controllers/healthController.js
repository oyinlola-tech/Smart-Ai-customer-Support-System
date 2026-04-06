const healthCheck = (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString()
  });
};

module.exports = { healthCheck };
