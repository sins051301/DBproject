import styled from "styled-components";

const GradeItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  padding: 15px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const MemberName = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #4a3aff;
`;

const Grade = styled.p`
  font-size: 16px;
  color: #333;
`;

const Score = styled.p`
  font-size: 16px;
  color: #333;
`;

const Feedback = styled.p`
  font-size: 14px;
  color: #777;
`;

interface GradeItemProps {
  member: {
    member_id: string;
    member_name: string;
    grade: string;
    score: number;
    feedback: string;
  };
}

function GradeItem({ member }: GradeItemProps) {
  return (
    <GradeItemContainer>
      <MemberName>{member.member_name}</MemberName>
      <Grade>{member.grade}</Grade>
      <Score>{member.score}</Score>
      <Feedback>{member.feedback}</Feedback>
    </GradeItemContainer>
  );
}

export default GradeItem;
