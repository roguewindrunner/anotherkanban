import { Context } from 'hono';
import { AuthService } from '../services/AuthService';
import { createUserSchema } from '../schemas/CreateUserRequestSchema';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(c: Context) {
    const request = createUserSchema.parse(await c.req.json());

    const response = await this.authService.register(request);

    return c.json(response, 201);
  }
}
