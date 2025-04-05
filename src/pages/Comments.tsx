import CommentItem from "@/features/comment/components/CommentItem";
import {
  useGetComment,
  useUpdateComment,
} from "@/features/comment/query/comment.query";
import LectureHeader from "@/features/lecture/components/LectureHeader";
import useCustomParams from "@/hooks/useCustomParams";
import React, { useState } from "react";
import styled from "styled-components";

const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const InputField = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  resize: none;
  height: 100px;
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 10px;
  background-color: #4a3aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3b2ccd;
  }
`;

const CommentListContainer = styled.div`
  margin-top: 20px;
`;

function Comments() {
  const id = useCustomParams();
  const { data } = useGetComment(id);
  const { mutate } = useUpdateComment();

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = () => {
    mutate({ id, comment: newComment });
  };

  return (
    <>
      <LectureHeader title="댓글" />
      <CommentInputContainer>
        <InputField
          value={newComment}
          onChange={handleCommentChange}
          placeholder="댓글을 작성하세요..."
        />
        <SubmitButton onClick={handleSubmitComment}>작성하기</SubmitButton>
      </CommentInputContainer>

      <CommentListContainer>
        {data.map((comment) => (
          <CommentItem key={comment.comment_id} comment={comment} />
        ))}
      </CommentListContainer>
    </>
  );
}

export default Comments;
