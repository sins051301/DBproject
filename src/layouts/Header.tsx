import styled from "styled-components";
import DummyLogo from "@/assets/dummyLogo.svg?react";
import { Link, useNavigate } from "react-router-dom";
import DummyProfile from "@/assets/dummyLogo.svg?react";

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

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderSection>
      <DummyLogo onClick={() => navigate("../")} />
      <DummyProfile onClick={() => navigate("/dashboard")} />
      <LoginButton to={"/login"}>로그인</LoginButton>
    </HeaderSection>
  );
}
export default Header;
