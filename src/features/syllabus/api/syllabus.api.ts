import api from "@/services";
import { SyllabusType } from "../types/SyllabusType";

export const getSyllabus = async (id: string): Promise<SyllabusType> => {
    const { data } = await api.get(`/syllabus?course_id=${id}`);
    return data;
  };