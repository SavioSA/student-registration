import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'course-student' })
export default class CourseStudent {
  @PrimaryGeneratedColumn()
  code: number;

  @Column()
  studentCode: number;

  @Column()
  courseCode: number;
}
