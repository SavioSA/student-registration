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
import Student from './student.entity';

@Entity({ name: 'course' })
export default class Course {
  @PrimaryGeneratedColumn()
  code: number;

  @Column({
    length: 50,
  })
  description: string;

  @Column()
  menu: string;

  @ManyToMany(() => Student, { nullable: true })
  @JoinTable({
    name: 'course-student',
  })
  students?: Student[];

  @CreateDateColumn({ name: 'created_at' })
  created!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted?: Date;
}
