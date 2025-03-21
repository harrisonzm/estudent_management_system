export interface Course {
  id: string;
  name: string;
  limit: number;
}

export interface CreateCourse {
  name: string;
  limit: number;
}

export interface UpdateCourse {
  name?: string;
  limit?: number;
}

export interface CourseWithStudents {
  course: Course;
  students: number;
}
