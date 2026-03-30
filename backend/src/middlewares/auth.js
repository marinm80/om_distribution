const jwt = require('jsonwebtoken');

/**
 * Validates the Access Token (short-lived, 15 min).
 * Attach the decoded payload to req.user.
 */
const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      data: null,
      message: 'Access token required',
      error: null,
    });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      data: null,
      message: 'Invalid or expired token',
      error: null,
    });
  }
};

/**
 * Validates the Refresh Token (long-lived, 7 days).
 * Used exclusively by POST /api/auth/refresh.
 * Attaches decoded payload to req.tokenPayload.
 */
const authenticateRefresh = (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      data: null,
      message: 'Refresh token required',
      error: null,
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    req.tokenPayload = decoded;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      data: null,
      message: 'Invalid or expired refresh token',
      error: null,
    });
  }
};

module.exports = { authenticate, authenticateRefresh };
