import DetailComment from "@/features/home/components/summaryDetail/DetailComment";
import styled from "styled-components";

const DiscussionContainer = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoContainer = styled.p`
  font-weight: normal;
  color: #6b7280;
  font-size: 0.8rem;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0px;
`;

const Summary = styled.div`
  padding: 15px;
  background: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ContentTitle = styled.h2`
  color: #111827;
  font-size: 0.9rem;
  font-weight: bold;
`;

const Content = styled.div`
  line-height: 1.6;
  margin-bottom: 20px;
`;

const CommentsSection = styled.div`
  margin-top: 20px;
`;

const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const CommentInput = styled.textarea`
  width: 90%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

const CommentButton = styled.button`
  margin-top: 10px;
  padding: 8px 15px;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const dummyComment = [
  {
    name: "신혁수",
    text: "문제는 정말 중요한 주제입니다. 특히 의사결정 과정의 투명성이 가장 중요하다고 생각합니다.",
  },
  {
    name: "나영채",
    text: " 과정의 투명성이 가장 중요하다고 생각합니다.",
  },
];

function SummaryDetail() {
  return (
    <DiscussionContainer>
      <Header>
        <Title>인공지능 윤리에 대한 토론</Title>
      </Header>
      <InfoContainer>2024년 2월 15일 * 참여자 238명</InfoContainer>
      <Summary>
        <ContentTitle>토론 요약</ContentTitle>
        인공지능의 발전에 따른 윤리적 문제와 규제 방안에 대한 토론입니다.
      </Summary>

      <Content>
        <ContentTitle>토론 내용</ContentTitle>
        인공지능의 윤리적 측면에서 가장 중요한 것은 투명성과 책임성입니다...
      </Content>

      <CommentsSection>
        <ContentTitle>댓글 (45)</ContentTitle>
        <CommentInputContainer>
          <CommentInput placeholder="댓글을 입력하세요..." />
          <CommentButton>등록</CommentButton>
        </CommentInputContainer>

        {dummyComment.map((comment) => (
          <DetailComment
            key={comment.name}
            name={comment.name}
            text={comment.text}
          />
        ))}
      </CommentsSection>
    </DiscussionContainer>
  );
}

export default SummaryDetail;
