import {
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getComment, updateComment } from "../api/comment.api";
import { CommentType } from "../types/CommentType";
import { queryClient } from "@/services/TanstackQueryStore";

interface UpdateType {
  id: string;
  comment: string;
}

export const useGetComment = (id: string) => {
  return useSuspenseQuery<CommentType[]>({
    queryKey: ["comments", id],
    queryFn: () => getComment(id),
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: ({ id, comment }: UpdateType) => updateComment(id, comment),
    onMutate: async ({ id, comment }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", id] });

      const previousComments = queryClient.getQueryData<string[]>([
        "comments",
        id,
      ]);

      queryClient.setQueryData<string[]>(["comments", id], (old) =>
        old ? [...old, comment] : [comment]
      );

      return { previousComments };
    },
    onError: (err, { id }, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", id], context.previousComments);
      }
    },
    onSettled: (_, __, variables) => {
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ["comments", variables.id] });
      }
    },
  });
};
