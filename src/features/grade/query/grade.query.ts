import { useSuspenseQuery } from "@tanstack/react-query";

import { GradeType } from "../types/GradeType";
import { getGrade } from "../api/grade.api";

export const useGetGrade = (id: string) => {
  return useSuspenseQuery<GradeType[]>({
    queryKey: ["grade"],
    queryFn: () => getGrade(id),
  });
};
