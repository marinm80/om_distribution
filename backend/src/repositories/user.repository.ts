import pool from '../config/pool';
import { User } from '../types';
import crypto from 'crypto';

class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows]: any = await pool.query(query, [email]);
    return rows[0] || null;
  }

  async findById(id: string | number): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows]: any = await pool.query(query, [id]);
    return rows[0] || null;
  }

  async create({ email, password, role = 'admin' }: { email: string; password: string; role?: string }): Promise<User> {
    const id = crypto.randomUUID();
    const query = `
      INSERT INTO users (id, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    await pool.query(query, [id, email, password, role]);
    const [rows]: any = await pool.query('SELECT id, email, role, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  async saveRefreshToken(userId: string | number, token: string, expiresAt: Date): Promise<void> {
    const query = `
      INSERT INTO refresh_tokens (user_id, token, expires_at)
      VALUES (?, ?, ?)
    `;
    await pool.query(query, [userId, token, expiresAt]);
  }

  async findRefreshToken(token: string): Promise<{ user_id: string; token: string; expires_at: Date } | null> {
    const query = 'SELECT * FROM refresh_tokens WHERE token = ?';
    const [rows]: any = await pool.query(query, [token]);
    return rows[0] || null;
  }

  async deleteRefreshToken(token: string): Promise<void> {
    const query = 'DELETE FROM refresh_tokens WHERE token = ?';
    await pool.query(query, [token]);
  }

  async deleteUserRefreshTokens(userId: string | number): Promise<void> {
    const query = 'DELETE FROM refresh_tokens WHERE user_id = ?';
    await pool.query(query, [userId]);
  }
}

export default new UserRepository();
