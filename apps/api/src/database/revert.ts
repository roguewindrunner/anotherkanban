import { AppDataSource } from './data-source';

async function revert() {
  try {
    await AppDataSource.initialize();

    await AppDataSource.undoLastMigration();

    console.log('✅ Revert completed.');

    await AppDataSource.destroy();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

revert();
