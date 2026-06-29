import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1782678908000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
    await queryRunner.createTable(
      new Table({
        name: 'users',

        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },

          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },

          {
            name: 'password_hash',
            type: 'varchar',
          },

          {
            name: 'name',
            type: 'varchar',
          },

          {
            name: 'avatar_url',
            type: 'varchar',
            isNullable: true,
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
