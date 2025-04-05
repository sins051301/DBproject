import { useSuspenseQuery } from "@tanstack/react-query";
import { CourseType } from "../types/CourseType";
import { getCourse, getMyCourse } from "../api/course.api";

export const useGetCourse = (isMyCourse: boolean = false) => {
    return useSuspenseQuery<CourseType[]>({
      queryKey: isMyCourse ? ["course", "my"] : ["course"],
      queryFn: isMyCourse ? getMyCourse : getCourse,
    });
  };
  