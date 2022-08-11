import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import Course from './course.entity';

@Entity()
export default class Student {
  @PrimaryGeneratedColumn()
  code: number;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.students, { nullable: true })
  @JoinTable({ name: 'course-student' })
  courses?: Course[];
}
