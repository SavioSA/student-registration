import { DataSource } from 'typeorm';
import CourseStudent from './entities/course-student.entity';
import Course from './entities/course.entity';
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
  {
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'COURSE_STUDENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CourseStudent),
    inject: ['DATA_SOURCE'],
  },
];
