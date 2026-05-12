// Migration: Add is_active and show_on_landing columns to products table
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('🔄 Adding is_active and show_on_landing columns to products...');

    await client.query(`
      ALTER TABLE products
      ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
      ADD COLUMN IF NOT EXISTS show_on_landing BOOLEAN DEFAULT false
    `);

    console.log('✅ Migration completed successfully!');
    console.log('   - is_active: defaults to TRUE (all products active)');
    console.log('   - show_on_landing: defaults to FALSE (must be manually enabled)');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
