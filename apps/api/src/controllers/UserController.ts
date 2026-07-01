import { Context } from 'hono';
import { UserService } from '../services/UserService';
import { createUserSchema } from '../schemas/CreateUserRequestSchema';

export class UserController {
  constructor(private readonly userService: UserService) {}
}
