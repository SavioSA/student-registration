import { MigrationInterface, QueryRunner } from 'typeorm';

export class database1660137687803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE DATABASE student-registration;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP DATABASE student-registration;');
  }
}
