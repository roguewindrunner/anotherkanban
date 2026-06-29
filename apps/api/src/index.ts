import { Hono } from 'hono';
import health from './routes/health.route';
import { AppDataSource } from './database/datasource';
import { UserRepository } from './repositories/UserRepository';
import { userRoutes } from './routes/user.route';
import { AppError } from './errors/AppError';
import { ContentfulStatusCode } from 'hono/utils/http-status';

const app = new Hono();

app.route('/health', health);
app.route('/users', userRoutes);
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
      err.statusCode as ContentfulStatusCode
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
    500
  );
});

export default app;
