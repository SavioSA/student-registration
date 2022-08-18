import CourseInterface from './course.interface';

interface CoursesPaginatedInterface {
  pagesQuantity: number;
  totalItems: number;
  courses: CourseInterface[];
}

export default CoursesPaginatedInterface;
