import useCustomParams from "@/hooks/useCustomParams";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #4a3aff;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled(Link)`
  width: 80px;
  height: 30px;
  text-align: center;
  text-decoration: none;
  background-color: #4a3aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3b2ccd;
  }
`;

interface HeaderProps {
  title: string;
}

function LectureHeader({ title }: HeaderProps) {
  const id = useCustomParams();
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <ButtonContainer>
        <Button to={`/course/${id}`}>강의 목록</Button>
        <Button to={`/course/${id}/syllabus`}>계획서</Button>
        <Button to={`/course/${id}/grade`}>성적</Button>
        <Button to={`/course/${id}/comments`}>댓글</Button>
        <Button to={`/course/${id}/announce`}>공지사항</Button>
        <Button to={`/course/${id}/material`}>학습자료</Button>
      </ButtonContainer>
    </HeaderContainer>
  );
}

export default LectureHeader;
