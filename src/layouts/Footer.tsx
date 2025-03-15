import styled from "styled-components";

const FooterSection = styled.footer`
  height: 8vh;
  text-align: center;
  border-top: 1px solid gray;
  font-size: 0.7rem;
  color: #9ca3af;
  background-color: white;
  width: 100%;
`;

function Footer() {
  return <FooterSection>© 2024 토론방. All rights reserved. </FooterSection>;
}
export default Footer;
