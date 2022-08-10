import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class course1660143639159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'course',
        columns: [
          {
            name: 'code',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'description',
            type: 'varchar(50)',
          },
          {
            name: 'menu',
            type: 'text',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('course');
  }
}
