import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.email(),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(100),

  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(100),
});
export type CreateUserRequest = z.infer<typeof createUserSchema>;
