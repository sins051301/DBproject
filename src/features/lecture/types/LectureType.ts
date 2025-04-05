export interface AssignmentType {
  assignment_id: string;
  title: string;
  description: string;
  due_date: string;
  created_at: string;
}

export interface LectureType {
  lecture_id: string;
  course_id: string;
  lecture_title: string;
  lecture_description: string;
  lecture_date: string;
  assignments: AssignmentType[];
}
