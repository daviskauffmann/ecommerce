import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class Seed1697756473187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('password', 10);

    return queryRunner.query(
      `
        INSERT INTO "user" (username, email, password, roles)
        VALUES ($1, $2, $3, $4)
      `,
      ['admin', 'email', password, ['user', 'admin']],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`DELETE FROM "user" WHERE username = $1`, [
      'admin',
    ]);
  }
}
