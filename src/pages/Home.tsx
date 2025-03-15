import Category from "@/features/home/components/category/Category";
import ChattingSummary from "@/features/home/components/summary/ChattingSummary";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 80vh;
  margin-top: 20px;
`;

const HomeContents = styled.main`
  width: 80vw;
  display: flex;
  flex-direction: column;
`;

function Home() {
  return (
    <>
      <HomeContainer>
        <HomeContents>
          <ChattingSummary />
        </HomeContents>
        <Category />
      </HomeContainer>
    </>
  );
}

export default Home;
