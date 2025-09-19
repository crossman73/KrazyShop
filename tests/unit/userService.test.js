const userService = require('../../src/services/userService');

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    test('should create a new user with hashed password', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser'
      };

      const user = await userService.createUser(userData);
      
      expect(user).toHaveProperty('id');
      expect(user.email).toBe(userData.email);
      expect(user.username).toBe(userData.username);
      expect(user).not.toHaveProperty('password'); // Password should not be returned
      expect(user).toHaveProperty('createdAt');
    });
  });

  describe('findByEmail', () => {
    test('should find user by email', async () => {
      const userData = {
        email: 'findme@example.com',
        password: 'password123',
        username: 'findme'
      };

      await userService.createUser(userData);
      const user = await userService.findByEmail(userData.email);
      
      expect(user).toBeTruthy();
      expect(user.email).toBe(userData.email);
    });

    test('should return null for non-existent email', async () => {
      const user = await userService.findByEmail('nonexistent@example.com');
      expect(user).toBeNull();
    });
  });

  describe('authenticate', () => {
    test('should authenticate user with correct credentials', async () => {
      const userData = {
        email: 'auth@example.com',
        password: 'password123',
        username: 'authuser'
      };

      await userService.createUser(userData);
      const user = await userService.authenticate(userData.email, userData.password);
      
      expect(user).toBeTruthy();
      expect(user.email).toBe(userData.email);
      expect(user).not.toHaveProperty('password');
    });

    test('should return null for incorrect password', async () => {
      const userData = {
        email: 'wrong@example.com',
        password: 'password123',
        username: 'wronguser'
      };

      await userService.createUser(userData);
      const user = await userService.authenticate(userData.email, 'wrongpassword');
      
      expect(user).toBeNull();
    });
  });

  describe('generateToken', () => {
    test('should generate a valid JWT token', async () => {
      const user = {
        id: '1',
        email: 'token@example.com',
        username: 'tokenuser'
      };

      const token = await userService.generateToken(user);
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });
  });

  describe('verifyToken', () => {
    test('should verify a valid token', async () => {
      const user = {
        id: '1',
        email: 'verify@example.com',
        username: 'verifyuser'
      };

      const token = await userService.generateToken(user);
      const decoded = await userService.verifyToken(token);
      
      expect(decoded).toBeTruthy();
      expect(decoded.id).toBe(user.id);
      expect(decoded.email).toBe(user.email);
    });

    test('should return null for invalid token', async () => {
      const decoded = await userService.verifyToken('invalid.token.here');
      expect(decoded).toBeNull();
    });
  });
});