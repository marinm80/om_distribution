const express = require('express');
const cors = require('cors');
const { validateEnv } = require('./config/env');
const errorHandler = require('./middlewares/error');
const pool = require('./config/pool');

validateEnv();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/products', require('./routes/product.routes'));
// app.use('/api/categories', require('./routes/category.routes'));
// app.use('/api/orders', require('./routes/order.routes'));

app.get('/api/health', async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({ success: true, data: { db: 'connected' }, message: 'API is running', error: null });
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

module.exports = app;
