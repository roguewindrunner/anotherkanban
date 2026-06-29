import { Context } from 'hono';
import { UserService } from '../services/UserService';
import { CreateUserRequest } from '../dto/CreateUserRequest';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async create(c: Context) {
    const request = await c.req.json<CreateUserRequest>();

    const response = await this.userService.create(request);

    return c.json(response, 201);
  }
}
