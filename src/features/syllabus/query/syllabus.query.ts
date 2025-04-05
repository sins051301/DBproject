import { useSuspenseQuery } from "@tanstack/react-query";
import { SyllabusType } from "../types/SyllabusType";
import { getSyllabus } from "../api/syllabus.api";

export const useGetSyllabus = (id: string) => {
  return useSuspenseQuery<SyllabusType>({
    queryKey: ["syllabus"],
    queryFn: () => getSyllabus(id),
  });
};
