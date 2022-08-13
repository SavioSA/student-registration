import { DataSource } from 'typeorm';
import Student from './entities/student.entity';
import dataSource from './ormconfig';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
  {
    provide: 'STUDENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Student),
    inject: ['DATA_SOURCE'],
  },
];
