const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/app');

// In-memory user store (in production, this would be a database)
let users = [];
let nextUserId = 1;

const userService = {
  async createUser(userData) {
    const { email, password, username } = userData;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, config.bcryptRounds);
    
    const newUser = {
      id: nextUserId.toString(),
      email,
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    nextUserId++;
    
    // Return user without password
    delete newUser.password;
    return newUser;
  },

  async findByEmail(email) {
    return users.find(user => user.email === email) || null;
  },

  async findById(id) {
    const user = users.find(user => user.id === id);
    if (!user) return null;
    
    // Return user without password
    const userCopy = { ...user };
    delete userCopy.password;
    return userCopy;
  },

  async authenticate(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return null;

    // Return user without password
    const userCopy = { ...user };
    delete userCopy.password;
    return userCopy;
  },

  async generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username
    };

    return jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' });
  },

  async verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      return null;
    }
  }
};

module.exports = userService;