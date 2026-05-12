/**
 * Script to create or reset the admin user.
 * Usage: node backend/scripts/create-admin.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const pool = require('../src/config/pool');

const EMAIL = 'admin@omdistribution.com';
const PASSWORD = 'Admin2026!';

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);
    
    await pool.query(
      `INSERT INTO users (email, password, role)
       VALUES ($1, $2, 'admin')
       ON CONFLICT (email) DO UPDATE SET password = $2`,
      [EMAIL, hashedPassword]
    );

    console.log('✅ Admin user created/updated successfully!');
    console.log(`   Email:    ${EMAIL}`);
    console.log(`   Password: ${PASSWORD}`);
    console.log(`   Role:     admin`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createAdmin();
