import api from "@/services";
import { CourseType } from "../types/CourseType";

export const getCourse = async (): Promise<CourseType[]> => {
  const { data } = await api.get(`/course`);
  return data;
};

export const getMyCourse = async (): Promise<CourseType[]> => {
    const { data } = await api.get(`/course/my`);
    return data;
  };
  