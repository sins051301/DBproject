import api from "@/services";
import { MaterialType } from "../types/MaterialType";


export const getMaterial = async (id: string): Promise<MaterialType[]> => {
    const { data } = await api.get(`/material?course_id=${id}`);
    return data;
  };