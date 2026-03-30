const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateRefresh } = require('../middlewares/auth');

const router = express.Router();

/**
 * POST /api/auth/refresh
 * Receives a valid refresh token and returns a new access token.
 *
 * Body: { refreshToken: string }
 * Response: { accessToken: string }
 *
 * TODO: when UserRepository is implemented, validate that the
 * refreshToken is still stored in the DB (rotation check) and
 * replace it with a newly generated one (token rotation).
 */
router.post('/refresh', authenticateRefresh, (req, res) => {
  const { id, email, role } = req.tokenPayload;

  const accessToken = jwt.sign(
    { id, email, role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  res.json({
    success: true,
    data: { accessToken },
    message: 'Access token refreshed',
    error: null,
  });
});

module.exports = router;
