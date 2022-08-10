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

  @Column({
    length: 50,
  })
  description: string;

  @Column()
  menu: string;

  @ManyToMany(() => Course)
  @JoinTable({ name: 'course_student' })
  students;
}
