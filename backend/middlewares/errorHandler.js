module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Server error';
  console.error(`[Error] ${status} - ${message}`);
  res.status(status).json({
    success: false,
    message
  });
};
