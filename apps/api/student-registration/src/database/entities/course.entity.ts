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

  @Column({
    length: 50,
  })
  description: string;

  @Column()
  menu: string;

  @ManyToMany(() => Student, (student) => student.courses, { nullable: true })
  @JoinTable({ name: 'course-student' })
  students?: Student[];
}
