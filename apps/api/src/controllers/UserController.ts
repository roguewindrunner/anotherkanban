import { Context } from 'hono';
import { UserService } from '../services/UserService';
import { createUserSchema } from '../schemas/CreateUserRequestSchema';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async create(c: Context) {
    const request = createUserSchema.parse(await c.req.json());

    const response = await this.userService.create(request);

    return c.json(response, 201);
  }
}
