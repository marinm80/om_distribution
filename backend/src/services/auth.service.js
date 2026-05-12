const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');
const AppError = require('../utils/AppError');

class AuthService {
  async login(email, password) {
    // 1. Verificar si el usuario existe
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // 2. Verificar password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError('Invalid email or password', 401);
    }

    // 3. Generar tokens
    const tokens = this.generateTokens(user);

    // 4. Guardar refresh token en BD
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 días
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

  generateTokens(user) {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(token) {
    // 1. Verificar token en BD
    const storedToken = await userRepository.findRefreshToken(token);
    if (!storedToken) {
      throw new AppError('Invalid refresh token', 403);
    }

    // 2. Verificar expiración real
    if (new Date() > new Date(storedToken.expires_at)) {
      await userRepository.deleteRefreshToken(token);
      throw new AppError('Refresh token expired', 403);
    }

    // 3. Verificar JWT
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await userRepository.findById(decoded.id);

      if (!user) {
        throw new AppError('User no longer exists', 403);
      }

      // 4. Generar nuevo access token
      const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      return { accessToken };
    } catch (err) {
      throw new AppError('Invalid refresh token', 403);
    }
  }

  async logout(token) {
    await userRepository.deleteRefreshToken(token);
  }
}

module.exports = new AuthService();
