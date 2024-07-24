const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger/swagger');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// API key middleware for Swagger
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.header('X-API-KEY');
  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Import routers
const adminRouter = require('./routes/admin');
const rndRouter = require('./routes/r&d');
const engineeringRouter = require('./routes/engineering');
const operationsRouter = require('./routes/operations');
const securityRouter = require('./routes/security');

// Use routers
app.use('/api/admin', adminRouter);
app.use('/api/rnd', rndRouter);
app.use('/api/engineering', engineeringRouter);
app.use('/api/operations', operationsRouter);
app.use('/api/security', securityRouter);

// Swagger setup with API key middleware
app.use('/api-docs', apiKeyMiddleware, swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
