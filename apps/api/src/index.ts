import { Hono } from 'hono';
import health from './routes/health.route';
import { AppDataSource } from './database/datasource';
import { UserRepository } from './repositories/UserRepository';
import { userRoutes } from './routes/user.route';

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

export default app;
