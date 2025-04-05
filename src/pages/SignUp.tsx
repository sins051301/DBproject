import { signUpRequest } from "@/features/signup/signup.api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignupContainer = styled.div`
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

const Input = styled.input`
  width: 40%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4a3aff;
  }
`;

const SignupButton = styled.button`
  width: 35%;
  padding: 12px;
  background: #4a3aff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #3b2ccd;
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

function Signup() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [memberName, setMemberName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    // 회원가입 처리 로직 (예: API 호출)

    // 예시: 비밀번호 유효성 검사
    if (password.length < 4) {
      alert("비밀번호는 최소 4자 이상이어야 합니다.");
      return;
    }
    await signUpRequest({
      nickname,
      email,
      member_name: memberName,
      password,
    });
    navigate("/login");
  };

  return (
    <SignupContainer>
      <Logo>로고</Logo>
      <Title>회원가입</Title>
      <Subtitle>회원가입을 위해 정보를 입력해주세요</Subtitle>

      <Input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        placeholder="회원 이름"
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <SignupButton onClick={handleSignup}>회원가입</SignupButton>

      <TextLink>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </TextLink>
    </SignupContainer>
  );
}

export default Signup;
