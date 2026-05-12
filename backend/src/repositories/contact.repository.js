const pool = require('../config/pool');

class ContactRepository {
  async create(data) {
    const { full_name, email, phone, company_name, message } = data;
    const query = `
      INSERT INTO contacts (full_name, email, phone, company_name, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [full_name, email, phone, company_name, message]);
    return rows[0];
  }

  async findAll() {
    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = new ContactRepository();
