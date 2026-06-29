import { AppDataSource } from './datasource';

async function migrate() {
  try {
    await AppDataSource.initialize();

    await AppDataSource.runMigrations();

    console.log('✅ Migrations completed.');

    await AppDataSource.destroy();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrate();
