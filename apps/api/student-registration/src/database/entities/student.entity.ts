import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Course from './course.entity';

@Entity({ name: 'student' })
export default class Student {
  @PrimaryGeneratedColumn()
  code: number;

  @Column()
  name: string;

  @ManyToMany(() => Course, { nullable: true })
  @JoinTable({
    name: 'course-student',
  })
  courses?: Course[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deleted?: Date;
}
