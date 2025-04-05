import api from "@/services";
import { CommentType } from "../types/CommentType";

export const getComment = async (id: string): Promise<CommentType[]> => {
  const { data } = await api.get(`/comment?course_id=${id}`);
  return data;
};

export const updateComment = async (id: string, comment: string) => {
  await api.post(`/comment`, { course_id: id, comment_text: comment });
};
