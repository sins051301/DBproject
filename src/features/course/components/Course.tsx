import { useNavigate } from "react-router-dom";
import ItemCover from "@/components/ItemCover";
import CourseList from "./CourseList";
import { useGetCourse } from "../query/course.query";

interface CourseProps {
  isMyCourse: boolean;
}

function Course({ isMyCourse }: CourseProps) {
  const navigate = useNavigate();
  const { data } = useGetCourse(isMyCourse);
  return (
    <ItemCover title="개설된 강의">
      {data.map((course) => (
        <CourseList
          onClick={() => navigate(`/course/${course.course_id}`)}
          key={course.course_id}
          title={course.title}
          description={`교수: ${course.professor_name}`}
          time={new Date(course.enrollment_date).toLocaleString()}
          image={course.img_url}
        />
      ))}
    </ItemCover>
  );
}

export default Course;
