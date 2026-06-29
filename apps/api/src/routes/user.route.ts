import { Hono } from 'hono';

import { UserController } from '../controllers/UserController';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export const userRoutes = new Hono();

userRoutes.post('/', (c) => userController.create(c));
