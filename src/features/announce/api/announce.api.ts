import api from "@/services";
import { AnnounceType } from "../types/AnnounceType";

export const getAnnounce = async (id: string): Promise<AnnounceType[]> => {
    const { data } = await api.get(`/announce?course_id=${id}`);
    return data;
  };