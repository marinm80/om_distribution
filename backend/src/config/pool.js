const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // SSL solo si se especifica explícitamente — el contenedor PostgreSQL interno no lo necesita
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
