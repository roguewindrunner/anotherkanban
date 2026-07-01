import { Hono } from 'hono';

import { Argon2PasswordHasher } from '../security/Argon2PasswordHasher';
import { UserRepository } from '../repositories/UserRepository';
import { AuthService } from '../services/AuthService';
import { AuthController } from '../controllers/AuthController';

const userRepository = new UserRepository();
const passwordHasher = new Argon2PasswordHasher();
const authService = new AuthService(userRepository, passwordHasher);
const authController = new AuthController(authService);

export const authRoutes = new Hono();

authRoutes.post('/register', (c) => authController.register(c));
