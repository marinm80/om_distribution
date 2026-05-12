const express = require('express');
const authService = require('../services/auth.service');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Lógica de controller inline para auth (o crear controlador aparte)
router.post('/login', async (req, res, next) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    
    // Cookie para refresh token
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: result.user,
        accessToken: result.accessToken
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post('/refresh', async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    const result = await authService.refreshToken(token);
    res.status(200).json({
      status: 'success',
      data: { accessToken: result.accessToken }
    });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    await authService.logout(token);
    res.clearCookie('refreshToken');
    res.status(200).json({ status: 'success' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
