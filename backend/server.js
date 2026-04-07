const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');
const sanitizeMiddleware = require('./middlewares/sanitize');
const aiRoutes = require('./routes/aiRoutes');
const healthRoutes = require('./routes/healthRoutes');
const modelRoutes = require('./routes/modelRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const onboardingRoutes = require('./routes/onboardingRoutes');
require('./config/db');

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(morgan('combined'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeMiddleware);

app.use('/api/health', healthRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
