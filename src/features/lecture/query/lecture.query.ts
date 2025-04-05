import { useSuspenseQuery } from "@tanstack/react-query";
import { LectureType } from "../types/LectureType";
import { getLecture } from "../api/lecture.api";

export const useGetLecture = (id: string) => {
  return useSuspenseQuery<LectureType[]>({
    queryKey: ["lecture", id],
    queryFn: () => getLecture(id),
  });
};
