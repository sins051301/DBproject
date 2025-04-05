import styled from "styled-components";

const CommentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
`;

const CommentAuthor = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #4a3aff;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
`;

const CommentDate = styled.p`
  font-size: 12px;
  color: #777;
  margin-top: 5px;
`;

interface CommentItemProps {
  comment: {
    comment_id: string;
    comment_text: string;
    created_at: string;
    member_id: string;
    author: string;
  };
}

function CommentItem({ comment }: CommentItemProps) {
  return (
    <CommentItemContainer>
      <CommentAuthor>{comment.author}</CommentAuthor>
      <CommentText>{comment.comment_text}</CommentText>
      <CommentDate>{new Date(comment.created_at).toLocaleString()}</CommentDate>
    </CommentItemContainer>
  );
}

export default CommentItem;
