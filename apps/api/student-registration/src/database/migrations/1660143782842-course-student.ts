import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class courseStudent1660143782842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'course-student',
        columns: [
          {
            name: 'code',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'student_code',
            type: 'int',
          },
          {
            name: 'course_code',
            type: 'int',
          },
        ],
      }),
      true,
    );

    const userForeignKey = new TableForeignKey({
      columnNames: ['student_code'],
      referencedColumnNames: ['code'],
      referencedTableName: 'student',
      onDelete: 'CASCADE',
    });

    const contactTypeForeignKey = new TableForeignKey({
      columnNames: ['course_code'],
      referencedColumnNames: ['code'],
      referencedTableName: 'course',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey('contact', userForeignKey);
    await queryRunner.createForeignKey('contact', contactTypeForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('course');
  }
}
