import { Hono } from 'hono';
import health from './routes/health.route';
import { AppDataSource } from './database/datasource';

const app = new Hono();

app.route('/health', health);
try {
  await AppDataSource.initialize();

  console.log('✅ Database connected.');

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
