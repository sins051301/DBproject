import { Link } from "react-router-dom";

import ErrorIcon from "@/assets/Error.svg?react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f9fafb;
  box-sizing: border-box;

  @media (max-width: 770px) {
    margin-top: 5px;
  }
`;

const IconWrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 8px;
  svg {
    width: 64px;
    height: 64px;
    color: #000;
  }
`;

const Title = styled.h1`
  font-size: 96px;
  font-weight: bold;
  margin: 0;
  color: #000;
`;

const Subtitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 16px 0 8px;
  color: #333;
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 32px;
  text-align: center;
`;

const LinkButton = styled(Link)`
  padding: 12px 24px;
  background-color: #000;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
  text-align: center;

  &:hover {
    background-color: #333;
  }
`;

function NotFound() {
  return (
    <Container>
      <IconWrapper>
        <ErrorIcon />
      </IconWrapper>
      <Title>404</Title>
      <Subtitle>페이지를 찾을 수 없습니다</Subtitle>
      <Description>
        요청하신 페이지가 삭제되었거나 일시적으로 사용할 수 없습니다.
      </Description>
      <LinkButton to="/">홈 화면으로 이동</LinkButton>
    </Container>
  );
}

export default NotFound;
