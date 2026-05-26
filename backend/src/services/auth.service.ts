import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userRepository from '../repositories/user.repository';
import AppError from '../utils/AppError';
import { User } from '../types';

class AuthService {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    if (!user.password) {
      throw new AppError('Invalid user configuration', 500);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError('Invalid email or password', 401);
    }

    const tokens = this.generateTokens(user);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await userRepository.saveRefreshToken(user.id, tokens.refreshToken, expiresAt);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  generateTokens(user: User) {
    const secret = process.env.JWT_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!secret || !refreshSecret) {
      throw new AppError('JWT secrets are not defined in environment', 500);
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      refreshSecret,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    const storedToken = await userRepository.findRefreshToken(token);
    if (!storedToken) {
      throw new AppError('Invalid refresh token', 403);
    }

    if (new Date() > new Date(storedToken.expires_at)) {
      await userRepository.deleteRefreshToken(token);
      throw new AppError('Refresh token expired', 403);
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!refreshSecret) {
      throw new AppError('JWT secret is not defined in environment', 500);
    }

    try {
      const decoded = jwt.verify(token, refreshSecret) as { id: number };
      const user = await userRepository.findById(decoded.id);

      if (!user) {
        throw new AppError('User no longer exists', 403);
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new AppError('JWT secret is not defined in environment', 500);
      }

      const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        secret,
        { expiresIn: '15m' }
      );

      return { accessToken };
    } catch (err) {
      throw new AppError('Invalid refresh token', 403);
    }
  }

  async logout(token: string) {
    await userRepository.deleteRefreshToken(token);
  }
}

export default new AuthService();
