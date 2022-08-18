import StudentInterface from './student.interface';

interface StudentsPaginatedInterface {
  pagesQuantity: number;
  totalItems: number;
  students: StudentInterface[];
}

export default StudentsPaginatedInterface;
