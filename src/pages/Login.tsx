import styled from "styled-components";
import GoogleLogo from "@/assets/google.svg?react";
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100vh;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #4a3aff;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  width: 50%;
  padding: 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`;


const TextLink = styled.p`
  font-size: 12px;
  color: #777;
  margin-top: 15px;

  a {
    color: #4a3aff;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function Login() {
  return (
    <LoginContainer>
      <Logo>로고</Logo>
      <Title>토론의 장에 오신 것을 환영합니다</Title>
      <Subtitle>함께 이야기를 나누어보세요</Subtitle>

      <LoginButton>
        <GoogleLogo />
        구글 계정으로 로그인
      </LoginButton>

      <TextLink>
        로그인 시 <a href="#">이용약관</a>과 <a href="#">개인정보처리방침</a>에
        동의하는 것으로 간주됩니다.
      </TextLink>

      <TextLink>로그인에 문제가 있으신가요?</TextLink>
    </LoginContainer>
  );
}

export default Login;
