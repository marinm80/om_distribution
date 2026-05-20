import pool from '../config/pool';

class ContactRepository {
  async create(data: { full_name: string; email: string; phone?: string; company_name?: string; message: string }) {
    const { full_name, email, phone, company_name, message } = data;
    const query = `
      INSERT INTO contacts (full_name, email, phone, company_name, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result]: any = await pool.query(query, [full_name, email, phone, company_name, message]);
    const [rows]: any = await pool.query('SELECT * FROM contacts WHERE id = ?', [result.insertId]);
    return rows[0];
  }

  async findAll() {
    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    const [rows]: any = await pool.query(query);
    return rows;
  }
}

export default new ContactRepository();
