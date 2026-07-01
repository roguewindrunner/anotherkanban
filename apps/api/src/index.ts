import { Hono } from 'hono';
import health from './routes/health.route';
import { AppDataSource } from './database/data-source';
import { UserRepository } from './repositories/UserRepository';
import { userRoutes } from './routes/user.route';
import { AppError } from './errors/AppError';
import { ContentfulStatusCode } from 'hono/utils/http-status';
import { ZodError, ZodType } from 'zod';
import { authRoutes } from './routes/auth.route';

type AppEnv = {
  Variables: {
    validatedBody: unknown;
  };
};

const app = new Hono<AppEnv>();

app.route('/health', health);
app.route('/users', userRoutes);
app.route('/auth', authRoutes);
try {
  await AppDataSource.initialize();

  console.log('✅ Database connected.');

  const userRepository = new UserRepository();

  console.log(await userRepository.findByEmail('test@test.com'));

  Bun.serve({
    fetch: app.fetch,
    port: 3000,
  });

  console.log('🚀 API running on http://localhost:3000');
} catch (err) {
  console.error(err);
  process.exit(1);
}

app.onError((err, c) => {
  if (err instanceof AppError) {
    return c.json(
      {
        success: false,

        error: {
          code: err.code,
          message: err.message,
        },
      },
      err.statusCode as ContentfulStatusCode,
    );
  }
  if (err instanceof ZodError) {
    return c.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed.',
        },
        details: err.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      },
      400,
    );
  }

  console.error(err);

  return c.json(
    {
      success: false,

      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong.',
      },
    },
    500,
  );
});

export default app;
