import styled from "styled-components";

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
`;

const CommentAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: gray;
  border-radius: 50%;
  margin-right: 10px;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentName = styled.div`
  font-weight: bold;
  font-size: 0.7rem;
`;

const CommentText = styled.p`
  margin-top: 5px;
  font-size: 0.75rem;
`;

interface DetailCommentProps {
  name: string;
  text: string;
}

function DetailComment({ name, text }: DetailCommentProps) {
  return (
    <Comment>
      <CommentAvatar />
      <CommentContent>
        <CommentName>{name}</CommentName>
        <CommentText>{text}</CommentText>
      </CommentContent>
    </Comment>
  );
}
export default DetailComment;
