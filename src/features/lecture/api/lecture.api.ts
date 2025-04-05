import api from "@/services";
import { LectureType } from "../types/LectureType";

export const getLecture = async (id: string): Promise<LectureType[]> => {
  const { data } = await api.get(`/course/lecture?course_id=${id}`);
  return data;
};
