const { validationResult } = require('express-validator');
const userService = require('../services/userService');
const logger = require('../utils/logger');

const userController = {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation Error',
          details: errors.array()
        });
      }

      const { email, password, username } = req.body;
      
      // Check if user already exists
      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'User with this email already exists'
        });
      }

      const user = await userService.createUser({ email, password, username });
      const token = await userService.generateToken(user);

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      logger.error('Error registering user:', error);
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation Error',
          details: errors.array()
        });
      }

      const { email, password } = req.body;
      const user = await userService.authenticate(email, password);

      if (!user) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid email or password'
        });
      }

      const token = await userService.generateToken(user);

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      logger.error('Error logging in user:', error);
      next(error);
    }
  },

  async getProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await userService.findById(userId);

      if (!user) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'User not found'
        });
      }

      res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt
      });
    } catch (error) {
      logger.error('Error getting user profile:', error);
      next(error);
    }
  }
};

module.exports = userController;