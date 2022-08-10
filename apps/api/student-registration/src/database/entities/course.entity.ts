import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import Student from './student.entity';

@Entity()
export default class Course {
  @PrimaryGeneratedColumn()
  code: number;

  @Column()
  name: string;

  @ManyToMany(() => Student)
  @JoinTable({ name: 'course_student' })
  courses;
}
