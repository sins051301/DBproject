import styled from "styled-components";
import DummyLogo from "@/assets/dummyLogo.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

const HeaderSection = styled.header`
  border-bottom: 1px solid gray;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const LoginButton = styled(Link)`
  width: 40px;
  height: 15px;
  background-color: black;
  color: white;
  border: none;
  font-size: 0.5rem;
  text-align: center;
  text-decoration: none;
  padding-top: 5px;
  border-radius: 2px;
`;

const SignUpButton = styled(Link)`
  width: 40px;
  height: 15px;
  background-color: white;
  color: black;
  border: 1px solid gray;
  font-size: 0.5rem;
  text-align: center;
  text-decoration: none;
  padding-top: 5px;
  border-radius: 2px;
`;

const ButtonSection = styled.div`
  flex-direction: row;
  gap: 10px;
  display: flex;
`;

function Header() {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);
  const accessToken = useAuthStore((state) => state.accessToken);
  console.log(accessToken);
  return (
    <HeaderSection>
      <DummyLogo onClick={() => navigate("../")} />

      {accessToken ? (
        <ButtonSection>
          <LoginButton to={"/course/my"}>내 강의</LoginButton>
          <SignUpButton to={"/"} onClick={clearToken}>
            로그아웃
          </SignUpButton>
        </ButtonSection>
      ) : (
        <ButtonSection>
          <LoginButton to={"/login"}>로그인</LoginButton>
          <SignUpButton to={"/signup"}>회원가입</SignUpButton>
        </ButtonSection>
      )}
    </HeaderSection>
  );
}
export default Header;
