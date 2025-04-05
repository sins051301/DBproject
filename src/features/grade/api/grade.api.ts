import api from "@/services";
import { GradeType } from "../types/GradeType";

export const getGrade = async (id: string): Promise<GradeType[]> => {
  const { data } = await api.get(`/grade?course_id=${id}`);
  return data;
};
