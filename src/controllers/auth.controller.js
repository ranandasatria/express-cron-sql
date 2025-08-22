const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const result = await authService.register({ email, password });

    if (!result.success && result.reason === 'EMAIL_EXISTS') {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      results: result.user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const result = await authService.login({ email, password });

    if (!result.success && result.reason === 'EMAIL_NOT_FOUND') {
      return res.status(404).json({
        success: false,
        message: 'Email not found',
      });
    }

    if (!result.success && result.reason === 'INVALID_PASSWORD') {
      return res.status(401).json({
        success: false,
        message: 'Wrong password',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login success',
      token: result.token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

module.exports = {
  register,
  login,
};
